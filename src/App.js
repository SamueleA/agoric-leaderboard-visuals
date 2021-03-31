import './App.css';
import Sidebar from './components/Sidebar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Overview from './pages/Overview';
import Tokens from "./pages/validators/Tokens";
import Commission from "./pages/validators/Commission";
import VotingPower from "./pages/validators/VotingPower";
import ProsperityPriority from "./pages/validators/ProsperityPriority";
import TokensDelegated from "./pages/validators/TokensDelegated";
import TokenSupply from "./pages/tokens/TokenSupply";
import TokenPool from "./pages/tokens/TokenPool";
import OutstandingRewards from "./pages/validators/OutstandingRewards";
import CommissionEarned from "./pages/validators/CommissionEarned";
import NumberOfDelegations from "./pages/validators/NumberOfDelegations";
import NumberOfDelegationsForDelegators from "./pages/delegators/NumberOfDelegations";

import RewardsEarned from "./pages/delegators/RewardsEarned";

function App() {
    return (
        <Router>
            <Sidebar/>
            <Switch>
                <Route path='/' exact component={Overview}/>
                <Route path='/validators/tokens' exact component={Tokens}/>
                <Route path='/validators/commission' exact component={Commission}/>
                <Route path='/validators/votingPower' exact component={VotingPower}/>
                <Route path='/validators/tokensDelegated' exact component={TokensDelegated}/>
                <Route path='/validators/prosperityPriority' exact component={ProsperityPriority}/>
                <Route path='/tokens/supply' exact component={TokenSupply}/>
                <Route path='/tokens/pool' exact component={TokenPool}/>
                <Route path='/validators/outstandingRewards' exact component={OutstandingRewards}/>
                <Route path='/validators/commissionEarned' exact component={CommissionEarned}/>
                <Route path='/validators/numberOfDelegation' exact component={NumberOfDelegations}/>
                <Route path='/delegators/rewards' exact component={RewardsEarned}/>
                <Route path='/delegators/delegations' exact component={NumberOfDelegationsForDelegators}/>






            </Switch>
        </Router>
    );
}

export default App;
