import { google, sheets_v4 } from 'googleapis';
import { JWT } from 'google-auth-library';
require('dotenv').config();

class GFacade {

    private jwtClient: JWT;
    public authorized: boolean;
    private api: sheets_v4.Sheets;
    private bookId: string;

    constructor(bookId: string) {

        this.jwtClient = new JWT(
            process.env.GOOGLE_API_CLIENT_EMAIL,
            undefined,
            process.env.GOOGLE_API_PRIVATE_KEY,
            ['https://www.googleapis.com/auth/spreadsheets']
        );
        this.authorized = false;
        this.api = google.sheets('v4');
        this.bookId = bookId;
    }

    async authorize() {
        try {
            await this.jwtClient.authorize.bind(this.jwtClient)();
            this.authorized = true;
        } catch (e) {
            console.log("Error authenticating with google: ");
            console.log(e);
            this.authorized = false;
        }

        // await promisify(this.jwtClient.authorize.bind(this.jwtClient))()
        // .then( bob => {
        //     // Doesn't work since 'this' refers to the anonymous object, rather than the GFacade
        //     this.authorized = true; 
        // })
        // .catch( err => {
        //     console.log("Error returned from google api:");
        //     console.log(err);
        //     // Doesn't work since 'this' refers to the anonymous object, rather than the GFacade
        //     this.authorized = false;
        // })
    }

    async queryCell(sheetName: string, cell: string) {
        let queryResult = await this.api.spreadsheets.values.get({
            auth: this.jwtClient,
            spreadsheetId: this.bookId,
            range: sheetName + '!' + cell
        })

        if (queryResult) {
            let rows = queryResult.data.values;
            if (rows === undefined || rows === null) {
                console.log('Unable to retrieve data on range: ' + sheetName + "!" + cell);
                return undefined;
            } else if (rows.length) {
                return rows[0].toString();
            } else {
                console.log('No data found in range: ' + sheetName + "!" + cell);
            }
        } else {
            console.log('Query failed to generate a result!');
            return undefined;
        }
    }

    async queryRecord(sheetName: string, cellRange: string) {
        let queryResult = await this.api.spreadsheets.values.get({
            auth: this.jwtClient,
            spreadsheetId: this.bookId,
            range: sheetName + '!' + cellRange
        })

        if (queryResult) {
            let rows = queryResult.data.values;
            if (rows === undefined) {
                console.log('Unable to retrieve data on range: ' + sheetName + "!" + cellRange);
                return undefined;
            } else {
                console.log(JSON.stringify(rows));
                return rows;
            }
        } else {
            console.log('Query failed to generate a result!');
            return undefined;
        }
    }
    /*
        async batchQueryRecords(cellRanges: string[]) {
            let queryResult = await this.api.spreadsheets.values.batchGet({
                auth: this.jwtClient,
                spreadsheetId: this.bookId,
                ranges: cellRanges
            })
    
            if (queryResult) {
    
                let rows = new Array<any>();
                if (queryResult.data.valueRanges === undefined) {
                    console.log('Unable to retrieve data on range: ' + JSON.stringify(cellRanges));
                    return undefined;
                } else {
                    queryResult.data.valueRanges.forEach(valueRange => {
                        valueRange.values!.forEach(record => {
                            rows.push(record);
                        });
                    });
                    return rows;
                }
            } else {
                console.log('Query failed to generate a result!');
                return undefined;
            }
        }
        */
};

export default GFacade;

