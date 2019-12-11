import React from 'react';

const convertCopper = (amount) => {
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

export default (props) => {
    const coins = convertCopper(props.value);
    return (
        <div className="currency-display">
            <div className="currency-display__title">Vendor Value: </div>
            <div className="currency-display__items">
                {coins.gold ? (
                    <span className="currency-display__item currency-display__gold">
                        {coins.gold}
                        <img src="https://render.guildwars2.com/file/090A980A96D39FD36FBB004903644C6DBEFB1FFB/156904.png" className="currency-display__coin-image" />
                    </span>
                ) : ''}
                {coins.silver || coins.gold > 0 ? (
                    <span className="currency-display__item currency-display__silver">
                        {coins.silver}
                        <img src="https://render.guildwars2.com/file/E5A2197D78ECE4AE0349C8B3710D033D22DB0DA6/156907.png" className="currency-display__coin-image" />
                    </span>
                ) : ''}
                <span className="currency-display__item currency-display__copper">
                    {coins.copper}
                    <img src="https://render.guildwars2.com/file/6CF8F96A3299CFC75D5CC90617C3C70331A1EF0E/156902.png" className="currency-display__coin-image" />
                </span>
            </div>
        </div>
    )
}