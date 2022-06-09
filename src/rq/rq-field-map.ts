export class RqFieldMap {
    private static fields = new Map<string, string>([
        [ "name", "D2" ],
        [ "reputation", "V3" ],
    ]);

    private static ranges = new Map<string, string>([

    ]);

    public static getFieldAddress( fieldName: string ): string | undefined {
        return this.fields.get(fieldName);
    }

    public static getRangeAddress( rangeName: string ): string | undefined {
        return this.ranges.get(rangeName);
    }
}