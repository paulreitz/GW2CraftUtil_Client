export const convertCopper = (amount) => {
    let copper = 0;
    let silver = 0;
    let gold = 0;

    if (amount >= 100) {
        silver = Math.floor(amount / 100);
        copper = amount % 100;
    }
    else {
        copper = amount;
    }

    if (silver >= 100) {
        gold = Math.floor(silver / 100);
        silver = silver % 100;
    }
    return {copper, silver, gold}
}