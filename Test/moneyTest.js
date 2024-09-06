import formatPrice from "../scripts/Utils/money.js";

describe("Test suite: FormatCurrency", () => {
    it('convert cents into dollars', () => {
        expect(formatPrice(2085)).toEqual("20.85");
    })
    it('convert zero cents into dollars', () => {
        expect(formatPrice(0)).toEqual("0.00");
    })
    it('convert cents into nearest dollars', () => {
        expect(formatPrice(2000.5)).toEqual("20.01");
    })
})