{
    const xrpl = require("xrpl");

    async function main() {


        const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
        await client.connect();

        const wallet = xrpl.Wallet.fromSeed("sEd7UcJb9AwPk6N77hKmfEaTWnWVwz5");
        console.log(wallet.address)


        //calculate end date for escrow
        // JavaScript Date() is natively expressed in milliseconds; convert to seconds
        const release_date_unix = Math.floor( new Date("2025-11-13T00:00:00Z") / 1000 );
        const release_date_ripple = release_date_unix - 946684800;
        console.log(release_date_ripple);


        //initiate escrow
        /*
        {
            "id": 2,
            "command": "submit",
            "secret": "s████████████████████████████",
            "tx_json": {
                "Account": "rajgkBmMxmz161r8bWYH7CQAFZP5bA9oSG",
                "TransactionType": "EscrowCreate",
                "Amount": "10000",
                "Destination": "rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn",
                "FinishAfter": 816307200
            }
          }
        */


        /*
        const fund_result = await client.fundWallet()
        const test_wallet = fund_result.wallet
        console.log(fund_result)
        */

        /*
        ALTNET WALLET

        wallet: Wallet {
            publicKey: 'ED08CDF8426DBDE314D423D9DDB4D3F623CF40B6A6DD852E47CA4D5FFA482390F8',
            privateKey: 'EDA8B640E26BCE48B977FFE5E145C04900C5449FCA5AFD7286A841C55372842A0D',
            classicAddress: 'rHmNQHw1MhSzhiaw6nqmgMHFd5oXrxUMQi',
            seed: 'sEd7UcJb9AwPk6N77hKmfEaTWnWVwz5'
          },
          balance: 10000
        */
        


        /*
        const prepared = await client.autofill({
            "TransactionType": "Payment",
            "Account": "rwUo...",
            "Amount": XMLSerializer.xrpToDrops("5"),
            "Destination": "rQDQ..."
        })
        */
        

        //console max_ledger = prepared.LastLedgerSquence

        await client.disconnect()
    }

    main()

}