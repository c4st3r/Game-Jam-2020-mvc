var initialData = {
    pending: null,
    general: [],
    people: [],
    tasks: [],
    items: [],
    categories: [],
    logs: [],
    logshash: [],
    tabs: [],
    sequence: 0,
};

var localdata;
var sinceLastSave = 0;
var sinceLastCheck = 0;
var sinceLastCheck2 = 0;
var debug = true;
var speedup = 1;
var changedItems = {};
var iconItems = {};
var updatePeople = true;


class Category extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = { currenticon: this.props.openicon };
    }
    handleClick() {
        if (this.state.currenticon == this.props.openicon) {
            this.setState({ currenticon: this.props.closeicon });
        }
        else {
            this.setState({ currenticon: this.props.openicon });
        }
    }
    render() {
        const isopen = (this.state.currenticon == this.props.openicon);
        const content = this.props.items.map((item) =>
            <tr key={item.name}>
                <td className="name"><span className={item.icon}></span>{item.name}</td>
                <td className="amount">{item.amount}</td>
            </tr>);
        return (
            <table id="items">
                <tbody>
                    <tr>
                        <th colSpan="2" onClick={this.handleClick}><span className={this.state.currenticon}></span>{this.props.name}</th>
                    </tr>
                    {isopen
                        ? content
                        : <tr />
                    }
                </tbody>
            </table>
        );
    }
}



class General extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = { currenticon: this.props.openicon };
    }
    handleClick() {
        if (this.state.currenticon == this.props.openicon) {
            this.setState({ currenticon: this.props.closeicon });
        }
        else {
            this.setState({ currenticon: this.props.openicon });
        }
    }
    render() {
        const isopen = (this.state.currenticon == this.props.openicon);
        const content = this.props.general.map((item) =>
            <tr key={item.name}>
                <td className="name"><span className={item.icon}></span><span className='tooltip'>{item.name}</span></td>
                <td className="amount">{item.name == 'People' ? (this.props.people.filter((person) => person.task == null).length + '/' + this.props.people.length) : item.amount}</td>

            </tr>);
        return (
            <table id="items">
                <tbody>
                    <tr>
                        <th colSpan="2" onClick={this.handleClick}><span className={this.state.currenticon}></span>{this.props.name}</th>
                    </tr>
                    {isopen
                        ? content
                        : <tr />
                    }
                </tbody>
            </table>
        );
    }
}


class People extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleReleaseClick = this.handleReleaseClick.bind(this);
        this.state = { currenticon: this.props.openicon };
    }
    handleClick() {
        if (this.state.currenticon == this.props.openicon) {
            this.setState({ currenticon: this.props.closeicon });
        }
        else {
            this.setState({ currenticon: this.props.openicon });
        }
    }
    handleReleaseClick() {
        this.props.handleReleaseClick();
    }
    render() {
        const isopen = (this.state.currenticon == this.props.openicon);
        const content = this.props.people.map((person) =>
            <tr key={person.id}>
                <td className='name' colSpan='2'>
                    <div className='personProfile'>
                        <div className={"personIcon " + person.icon + (person.task ? " personOpaque" : "")}></div>
                        <div className='person'>
                            <div className='personBar hunger' style={{ width: person.hunger / 10 + "%" }}></div>
                            <div className='personBar thirst' style={{ width: person.thirst / 10 + "%" }}></div>
                            <div className='personBar health' style={{ width: person.health / 10 + "%" }}></div>
                        </div>
                    </div>
                    <span className='tooltip'>{person.name}
                        <table>
                            <tbody>
                                <tr><td className='name'>Hunger:</td><td className='thunger'>{Math.round(person.hunger / 10)}%</td></tr>
                                <tr><td className='name'>Thirst:</td><td className='tthirst'>{Math.round(person.thirst / 10)}%</td></tr>
                                <tr><td className='name'>Health:</td><td className='thealth'>{Math.round(person.health / 10)}%</td></tr>
                            </tbody>
                        </table>
                    </span>
                </td>
            </tr>);
        return (
            <table id="items">
                <tbody>
                    <tr>
                        <th colSpan="2" onClick={this.handleClick}><span className={this.state.currenticon}></span>{this.props.name}</th>
                    </tr>
                    {isopen ? content : <tr />}
                    <tr><td className='name' colSpan='2'><button onClick={this.handleReleaseClick} className={"releaseButton" + ((this.props.people.some((person) => person.task != null)) ? "" : " disabled")}>Release all</button></td></tr>
                </tbody>
            </table>
        );
    }
}

class LeftPanel extends React.Component {
    constructor(props) {
        super(props);
        this.handleReleaseClick = this.handleReleaseClick.bind(this);
    }
    handleReleaseClick() {
        this.props.handleReleaseClick();
    }
    render() {
        const content = this.props.categories.map((category) =>
            <Category key={category.name} name={category.name} items={category.items.filter((item) => item.found)} openicon="fas fa-caret-down" closeicon="fas fa-caret-right" />);
        return (
            <div className="leftpanel">
                <General name="General" openicon="fas fa-caret-down" closeicon="fas fa-caret-right" general={this.props.general} people={this.props.people} />
                <People name="People" openicon="fas fa-caret-down" closeicon="fas fa-caret-right" people={this.props.people} handleReleaseClick={this.props.handleReleaseClick} />
                {content}
            </div>
        );
    }
}

class Tab extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = { currenticon: this.props.openicon };
    }
    handleClick() {
        this.props.handleClick(this.props.name);
    }
    render() {
        return (
            <div className={"tablink" + (this.props.opentab == this.props.name ? " active" : "")} onClick={this.handleClick}>
                <span className={this.props.icon}>{this.props.name} {this.props.taskcount}<span className="tabnum" /></span>
            </div>);
    }
}

class TaskBlock extends React.Component {
    constructor(props) {
        super(props);
        this.handleaddClick = this.handleaddClick.bind(this);
    }
    handleaddClick(name, direction, e) {
        this.props.handleaddClick(name, direction, this.props.name);
    }
    render() {
        let Styling = {};
        if (this.props.opentab == this.props.name) {
            Styling = { display: "block" };
        }
        let MeetTaskReq = true;
        let taskvisible = true;
        let content = <div />;
        if (taskvisible) {
            content = this.props.tasks.map((task) =>
                <div key={task.name} className="task">
                    <div className={"taskHeader" + ((checkResources(task, false)) ? "" : " lacking")}>
                        <div className='taskBar' style={{ width: (task.progress / task.effort * 100) + "%" }}></div>
                        <div className='progresstext'><span className={task.icon} >{task.name}</span></div>
                    </div>
                    <div className='taskDurability'>
                        <div className='taskDurabilityBar'></div>
                    </div>
                    <div className='btngroup'>
                        <button className={"taskminus btn left" + ((task.people.length == 0) ? " disabled" : "")} onClick={(e) => this.handleaddClick(task.name, "minus", e)}><span className='fas fa-minus' /></button>
                        <div className='center'><span className='number'>{task.people.length}</span><span className='fas fa-male' /></div>
                        <button className={"taskplus btn right" + ((this.props.freepeople == 0) ? " disabled" : "")} onClick={(e) => this.handleaddClick(task.name, "plus", e)} ><span className='fas fa-plus' /></button>
                    </div>
                </div>
            );
        }
        return (
            <div className="tabcontent" style={Styling}>
                {content}
            </div>);
    }
}

class MainPanel extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleaddClick = this.handleaddClick.bind(this);
        this.state = { opentab: this.props.tabs[0].name };
    }
    handleClick(name) {
        this.setState({ opentab: name });
    }
    handleaddClick(task, direction, tab) {
        this.props.handleaddClick(task, direction, tab);
    }
    render() {
        const content = this.props.tabs.map((tab) =>
            <Tab key={tab.name} name={tab.name} icon={tab.icon} opentab={this.state.opentab} taskcount={tab.tasks.length} handleClick={this.handleClick} />);
        const content2 = this.props.tabs.map((tab) =>
            <TaskBlock key={tab.name} name={tab.name} opentab={this.state.opentab} tasks={tab.tasks} handleaddClick={this.handleaddClick} freepeople={this.props.freepeople} />);
        return (
            <div className="mainpanel">
                <div className="tabs">
                    {content}
                </div>
                {content2}
            </div>
        );
    }
}

class RightPanel extends React.Component {
    render() {
        const content = this.props.logs.map((log) =>
            <p key={log.text} className={log.type}>{log.text}</p>);
        return (
            <div className="rightpanel">
                <div className="panelheader">Log</div>
                <div id="logwindow">
                    {content}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        reset();
        this.handleaddClick = this.handleaddClick.bind(this);
        this.handleReleaseClick = this.handleReleaseClick.bind(this);
        this.state = { categories: localdata.categories, general: localdata.general, people: localdata.people, tabs: localdata.tabs, logs: localdata.logs };
    }
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            20
        );
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    tick() {
        localdata.categories = [...this.state.categories];
        localdata.general = [...this.state.general];
        localdata.people = [...this.state.people];
        localdata.tabs = [...this.state.tabs];
        localdata.logs = [...this.state.logs];
        update(2);
        this.setState({ categories: localdata.categories, general: localdata.general, people: localdata.people, tabs: localdata.tabs, logs: localdata.logs });
    }
    handleaddClick(task, direction, tab) {
        let tablist = [...this.state.tabs];
        let peoplelist = [...this.state.people];
        if (direction == "minus") {
            const currenttab = tablist.findIndex((ttab) => ttab.name == tab);
            const currenttask = tablist[currenttab].tasks.findIndex((ttask) => ttask.name == task);
            if (tablist[currenttab].tasks[currenttask].people.length > 0) {
                const person = tablist[currenttab].tasks[currenttask].people.pop();
                const currentPerson = peoplelist.findIndex((tperson) => tperson.id == person.id);
                peoplelist[currentPerson].task = null;
            }
            //find last busy person and remove their task
        }
        else {
            const currentPerson = peoplelist.findIndex((tperson) => tperson.task == null);
            if (currentPerson > -1) {
                const currenttab = tablist.findIndex((ttab) => ttab.name == tab);
                const currenttask = tablist[currenttab].tasks.findIndex((ttask) => ttask.name == task);
                peoplelist[currentPerson].task = tablist[currenttab].tasks[currenttask];
                tablist[currenttab].tasks[currenttask].people.push(peoplelist[currentPerson]);
            }
            //find first unbusy person and add their task
        }
        this.setState({ tabs: tablist, people: peoplelist });
    }
    handleReleaseClick() {
        let tablist = [...this.state.tabs];
        let peoplelist = [...this.state.people];
        tablist.forEach(AllTasks);
        function AllTasks(item, index, arr) {
            arr[index].tasks.forEach(ClearPeople);
        }
        function ClearPeople(item, index, arr) {
            arr[index].people = [];
        }
        peoplelist.forEach(ClearTasks);
        function ClearTasks(item, index, arr) {
            arr[index].task = null;
        }
        this.setState({ tabs: tablist, people: peoplelist });
    }
    render() {
        return (
            <div id="wrapper">
                <LeftPanel categories={this.state.categories.filter((category) => category.items.some((item) => item.found))} general={this.state.general} people={this.state.people} handleReleaseClick={this.handleReleaseClick} />
                <MainPanel tabs={this.state.tabs} handleaddClick={this.handleaddClick} freepeople={this.state.people.filter((person) => person.task == null).length} />
                <RightPanel logs={this.state.logs} />
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);