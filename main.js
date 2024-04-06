{
    const xrpl = require("xrpl");

    async function main() {


        const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233")
        await client.connect();

        /*
        Testnet (Altnet) wallet

        https://testnet.xrpl.org/accounts/rHmNQHw1MhSzhiaw6nqmgMHFd5oXrxUMQi

        wallet: Wallet {
            publicKey: 'ED08CDF8426DBDE314D423D9DDB4D3F623CF40B6A6DD852E47CA4D5FFA482390F8',
            privateKey: 'EDA8B640E26BCE48B977FFE5E145C04900C5449FCA5AFD7286A841C55372842A0D',
            classicAddress: 'rHmNQHw1MhSzhiaw6nqmgMHFd5oXrxUMQi',
            seed: 'sEd7UcJb9AwPk6N77hKmfEaTWnWVwz5'
          },
          balance: 10000
          
        */
        

        const wallet = xrpl.Wallet.fromSeed("sEd7UcJb9AwPk6N77hKmfEaTWnWVwz5");
        console.log(wallet.classicAddress)


        //calculate end date for escrow
        // JavaScript Date() is natively expressed in milliseconds; convert to seconds
        const rippleOffset = 946684800 //ripple initial epoch

        const release_date_unix = Math.floor( new Date("2024-12-31T00:00:00Z") / 1000 );
        const release_date_ripple = release_date_unix - rippleOffset;
        console.log(release_date_ripple);

        //example of payment
        const preparedPayment = await client.autofill({
            "TransactionType": "Payment",
            "Account": wallet.classicAddress,
            "Amount": xrpl.xrpToDrops("1"),
            "Destination": "rUCzEr6jrEyMpjhs4wSdQdz4g8Y382NxfM"
          })

        //example of escrow
        const preparedEscrow = await client.autofill({
            "TransactionType": "EscrowCreate",
            "Account": wallet.classicAddress,
            "Amount": xrpl.xrpToDrops("2"),
            "Destination": "rUCzEr6jrEyMpjhs4wSdQdz4g8Y382NxfM",
            "FinishAfter": release_date_ripple
        })

          const max_ledger = preparedEscrow.LastLedgerSequence
          console.log("Prepared transaction instructions:", preparedEscrow)
          console.log("Transaction cost:", xrpl.dropsToXrp(preparedEscrow.Fee), "XRP")
          console.log("Transaction expires after ledger:", max_ledger)


          const signed = wallet.sign(preparedEscrow)
          console.log("Identifying hash:", signed.hash)
          console.log("Signed blob:", signed.tx_blob)

          const tx = await client.submitAndWait(signed.tx_blob)


        await client.disconnect()
    }

    main()

}