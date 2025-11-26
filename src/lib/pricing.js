// Dynamic Pricing Service
// Calculates prices based on date, demand, weekends, festivals, and seasons

import { differenceInDays, isWeekend, getMonth } from 'date-fns';

// Indian festivals and holidays (simplified list)
const INDIAN_FESTIVALS = [
    { month: 0, day: 26, name: 'Republic Day' }, // January 26
    { month: 2, day: 8, name: 'Holi' }, // March (varies)
    { month: 7, day: 15, name: 'Independence Day' }, // August 15
    { month: 9, day: 2, name: 'Gandhi Jayanti' }, // October 2
    { month: 9, day: 24, name: 'Diwali' }, // October/November (varies)
    { month: 11, day: 25, name: 'Christmas' }, // December 25
];

/**
 * Check if a date falls during a festival period
 * @param {Date} date 
 * @returns {boolean}
 */
export function isFestivalPeriod(date) {
    const month = date.getMonth();
    const day = date.getDate();

    return INDIAN_FESTIVALS.some(festival => {
        // Check if date is within 3 days of the festival
        return festival.month === month && Math.abs(festival.day - day) <= 3;
    });
}

/**
 * Get seasonal multiplier based on month
 * Peak season (Dec-Feb): 1.3x
 * Off season (Jul-Sep): 0.8x
 * Regular season: 1.0x
 * @param {Date} date 
 * @returns {number}
 */
export function getSeasonalMultiplier(date) {
    const month = getMonth(date);

    // Peak season: December, January, February
    if (month === 11 || month === 0 || month === 1) {
        return 1.3;
    }

    // Off season: July, August, September (monsoon)
    if (month >= 6 && month <= 8) {
        return 0.8;
    }

    // Regular season
    return 1.0;
}

/**
 * Calculate dynamic price for a listing on a specific date
 * @param {Object} listing - Listing object with price and multipliers
 * @param {Date} date - Date to calculate price for
 * @returns {number} - Calculated price
 */
export function calculateDynamicPrice(listing, date) {
    const basePrice = listing.basePrice || listing.price;
    let finalPrice = basePrice;

    // Apply weekend pricing (+25% by default)
    if (isWeekend(date)) {
        finalPrice *= listing.weekendMultiplier || 1.25;
    }

    // Apply festival pricing (+50%)
    if (isFestivalPeriod(date)) {
        finalPrice *= 1.5;
    }

    // Apply seasonal pricing
    const seasonalMultiplier = getSeasonalMultiplier(date);
    finalPrice *= seasonalMultiplier;

    // Apply demand-based pricing
    finalPrice *= listing.demandMultiplier || 1.0;

    return Math.round(finalPrice);
}

/**
 * Calculate total price for a date range
 * @param {Object} listing 
 * @param {Date} startDate 
 * @param {Date} endDate 
 * @returns {Object} - { totalPrice, breakdown: [] }
 */
export function calculateTotalPrice(listing, startDate, endDate) {
    const nights = differenceInDays(endDate, startDate);
    const breakdown = [];
    let totalPrice = 0;

    // Calculate price for each night
    for (let i = 0; i < nights; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(currentDate.getDate() + i);

        const nightPrice = calculateDynamicPrice(listing, currentDate);
        totalPrice += nightPrice;

        breakdown.push({
            date: currentDate.toISOString().split('T')[0],
            price: nightPrice,
            isWeekend: isWeekend(currentDate),
            isFestival: isFestivalPeriod(currentDate),
            seasonalMultiplier: getSeasonalMultiplier(currentDate)
        });
    }

    return {
        totalPrice,
        averagePerNight: Math.round(totalPrice / nights),
        nights,
        breakdown
    };
}

/**
 * Get price display text with dynamic pricing indicator
 * @param {Object} listing 
 * @param {Date} date 
 * @returns {Object} - { price, originalPrice, discount }
 */
export function getPriceDisplay(listing, date = new Date()) {
    const basePrice = listing.basePrice || listing.price;
    const dynamicPrice = calculateDynamicPrice(listing, date);

    const discount = basePrice > dynamicPrice ?
        Math.round(((basePrice - dynamicPrice) / basePrice) * 100) : 0;

    return {
        price: dynamicPrice,
        originalPrice: basePrice !== dynamicPrice ? basePrice : null,
        discount,
        isPeakPricing: dynamicPrice > basePrice
    };
}
