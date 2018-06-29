import './index.css'
import React from 'react'
import PropTypes from 'prop-types';

class Select extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    defaultValue: PropTypes.any
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      selectValue: this.props.selectValue,
    };

    if (props.defaultValue) this.state.selectValue = props.defaultValue;
  }

  componentWillMount() {
    if (this.props.value) return this.updateValue(this.props.value);
  }

  componentDidUpdate() {
    if (this.props.value && this.state.selectValue !== this.props.value) {
      this.state.selectValue = this.props.value;
      this.forceUpdate()
    }
  }

  static childContextTypes = {
    isOpen: PropTypes.bool.isRequired,
    selectValue: PropTypes.string,
    updateValue: PropTypes.func.isRequired,
  };


  getChildContext() {
    return {
      ...this.state,
      updateValue: this.updateValue
    };
  }

  updateValue = (value) => {
    this.setState({selectValue: value, isOpen: false})
  };

  onClick = (e) => {
    e.preventDefault();

    this.setState({isOpen: !this.state.isOpen})
  };

  render() {
    const {isOpen, selectValue} = this.state;
    return (
      <div className="select">
        <div className="label" onClick={this.onClick}> {selectValue} <span className="arrow">▾</span></div>
        {isOpen && (
          <div className="options">
            {this.props.children}
          </div>
        )}
      </div>
    )
  }
}


class Option extends React.Component {

  static contextTypes = {
    value: PropTypes.string,
    isOpen: PropTypes.bool.isRequired,
    updateValue: PropTypes.func.isRequired,
  };

  onClick = (e) => {
    e.preventDefault();
    this.context.updateValue(this.props.children);
  };

  render() {
    return (
      <div className="option" onClick={this.onClick}>
        {this.props.children}
      </div>
    )
  }
}

class App extends React.Component {

  state = {
    selectValue: 'dosa'
  };

  constructor(props) {
    super(props);
    this.setToMintChutney = this.setToMintChutney.bind(this);
  }

  setToMintChutney() {
    this.setState({
      selectValue: 'mint-chutney'
    })
  };

  render() {
    return (
      <div className="app">
        <div className="block">
          <h2>Uncontrolled</h2>
          <Select defaultValue="tikka-masala">
            <Option value="tikka-masala">Tikka Masala</Option>
            <Option value="tandoori-chicken">Tandoori Chicken</Option>
            <Option value="dosa">Dosa</Option>
            <Option value="mint-chutney">Mint Chutney</Option>
          </Select>
        </div>

        <div className="block">
          <h2>Controlled</h2>
          <p>
            <button onClick={this.setToMintChutney}>
              Set to Mint Chutney
            </button>
          </p>
          <Select
            value={this.state.selectValue}
            onChange={(selectValue) => {
              this.setState({selectValue})
            }}
          >
            <Option value="tikka-masala">Tikka Masala</Option>
            <Option value="tandoori-chicken">Tandoori Chicken</Option>
            <Option value="dosa">Dosa</Option>
            <Option value="mint-chutney">Mint Chutney</Option>
          </Select>
        </div>
      </div>
    )
  }
}

export default App
