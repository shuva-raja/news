import React, { useState, useEffect } from 'react';
import CardSection from './CardSection';
import Header from './Header';
import ChartSection from './ChartSection';

const CryptoDashboard = () => {
  const [cryptoData, setCryptoData] = useState({
    Id: "bitcoin",
    Data: {},
  });

  const fetchData = async () => {
    let data = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoData.Id}`);
    let jsonData = await data.json();
    setCryptoData({ Id: cryptoData.Id, Data: jsonData });
  };

  const handleSubmit = async (event) => {
    await setCryptoData({ Id: event.target.value, Data: cryptoData.Data });
    fetchData();
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => fetchData(), 2000);

    return () => clearInterval(interval);
  }, [cryptoData.Id]);

  return (
    <div style={{backgroundColor:'gray'}}>
      <Header handle_Submit={handleSubmit} />
      <CardSection
        coinName={cryptoData.Data.name}
        currentPrice={cryptoData.Data.market_data ? cryptoData.Data.market_data.current_price['usd'] : ''}
        mCap24={cryptoData.Data.market_data ? cryptoData.Data.market_data.market_cap_change_percentage_24h : ''}
        ath={cryptoData.Data.market_data ? cryptoData.Data.market_data.ath.usd : ''}
        atl={cryptoData.Data.market_data ? cryptoData.Data.market_data.ath.usd : ''}
        sentiment={cryptoData.Data.sentiment_votes_up_percentage}
        high24={cryptoData.Data.market_data ? cryptoData.Data.market_data.high_24h['usd'] : ''}
        low24={cryptoData.Data.market_data ? cryptoData.Data.market_data.low_24h['usd'] : ''}
      />
      <ChartSection
        Id={cryptoData.Id}
        priceChange24={cryptoData.Data.market_data ? cryptoData.Data.market_data.price_change_24h_in_currency.usd : ''}
        MarketCap={cryptoData.Data.market_data ? cryptoData.Data.market_data.market_cap.usd : ''}
        TotVol={cryptoData.Data.market_data ? cryptoData.Data.market_data.total_volume.usd : ''}
        Circulating={cryptoData.Data.market_data ? cryptoData.Data.market_data['circulating_supply'] : ''}
        twitterF={cryptoData.Data.community_data ? cryptoData.Data.community_data.twitter_followers : ''}
      />
    </div>
  );
};

export default CryptoDashboard;

// import React, { Component } from 'react';
// import CardSection from './CardSection';
// import Header from './Header';
// import ChartSection from './ChartSection';

// class CryptoDashboard extends Component {
//   constructor() {
//     super();
//     this.state = {
//       Id: "bitcoin",
//       Data: {},
//     };
//   }

//   fetchData = async () => {
//     let data = await fetch('https://api.coingecko.com/api/v3/coins/' + this.state.Id);
//     let JsonData = await data.json();
//     this.setState({ Id: this.state.Id, Data: JsonData });
//   };

//   handleSubmit = async (event) => {
//     await this.setState({ Id: event.target.value, Data: this.state.Data });
//     this.fetchData();
//   };

//   componentDidMount() {
//     this.fetchData();
//   }

//   componentWillUnmount() {
//     clearInterval(this.interval);
//   }

//   render() {
//     return (
//       <div>
//         <Header handle_Submit={this.handleSubmit} />
//         <CardSection
//           coinName={this.state.Data.name}
//           currentPrice={this.state.Data.market_data ? this.state.Data.market_data.current_price['usd'] : ''}
//           mCap24={this.state.Data.market_data ? this.state.Data.market_data.market_cap_change_percentage_24h : ''}
//           ath={this.state.Data.market_data ? this.state.Data.market_data.ath.usd : ''}
//           atl={this.state.Data.market_data ? this.state.Data.market_data.ath.usd : ''}
//           sentiment={this.state.Data.sentiment_votes_up_percentage}
//           high24={this.state.Data.market_data ? this.state.Data.market_data.high_24h['usd'] : ''}
//           low24={this.state.Data.market_data ? this.state.Data.market_data.low_24h['usd'] : ''}
//         />
//         <ChartSection
//           Id={this.state.Id}
//           priceChange24={this.state.Data.market_data ? this.state.Data.market_data.price_change_24h_in_currency.usd : ''}
//           MarketCap={this.state.Data.market_data ? this.state.Data.market_data.market_cap.usd : ''}
//           TotVol={this.state.Data.market_data ? this.state.Data.market_data.total_volume.usd : ''}
//           Circulating={this.state.Data.market_data ? this.state.Data.market_data['circulating_supply'] : ''}
//           twitterF={this.state.Data.community_data ? this.state.Data.community_data.twitter_followers : ''}
//         />
//       </div>
//     );
//   }
// }

// export default CryptoDashboard;
