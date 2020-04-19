import React from 'react';
import Lexxi from './lexxi.png'
import './App.css';


class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        email: '',
        phone: '',
        loseweight: '',
        struggle: '',
        eat: '',
        water: '',
        meal: '',
        submitted: false
      
      };

      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePhoneChange = this.handlePhoneChange.bind(this);
      this.handleWeightChange = this.handleWeightChange.bind(this);
      this.handleStruggleChange = this.handleStruggleChange.bind(this);
      this.handleEatChange = this.handleEatChange.bind(this);
      this.handleWaterChange = this.handleWaterChange.bind(this);
      this.handleMealChange = this.handleMealChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
      this.setState({name: event.target.value});
    }

    handleEmailChange(event) {
      this.setState({email: event.target.value});
    }

    handlePhoneChange(event) {
      this.setState({phone: event.target.value});
    }

    handleWeightChange(event) {

      if(event.target.value === 'N') {

        this.setState({
          loseweight: 'N',
          struggle: '',
          eat: '',
          water: '',
          meal: '',
          submitted: false});

      } else {

        this.setState({
          loseweight: 'Y',
          struggle: '',
          eat: '',
          water: '',
          meal: '',
          submitted: false});

      }
      
    }

    handleStruggleChange(event) {
      this.setState({struggle: event.target.value});
    }

    handleEatChange(event) {
      this.setState({eat: event.target.value});
    }

    handleWaterChange(event) {
      this.setState({water: event.target.value});
    }

    handleMealChange(event) {
      this.setState({meal: event.target.value});
    }

    handleSubmit(event) {
      this.setState({submitted: !this.state.submitted})
      console.log(this.state);
      this.callAPI();
      event.preventDefault();
    }

    callAPI() {
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({data:this.state})
      };
      
      fetch('http://192.168.1.233:5000', requestOptions)
      .then(res => console.log(res.text()));
    }

    render() {
      return (
        <div>

          <img src={Lexxi} alt="Lexxi" />
          
          <form onSubmit={this.handleSubmit}>
            
            <label >
              Name:
              <input className="val" type="text" placeholder="John Doe" required value={this.state.name} onChange={this.handleNameChange} />
            </label>

            <div className="elementspace"></div>

            <label>
              Email:
              <input className="val" type="email" placeholder="user@example.com" required value={this.state.email} onChange={this.handleEmailChange} />
            </label>

            <div className="elementspace"></div>

            <label>
              Phone #:
              <input className="val" type="tel" placeholder="4043132114" required value={this.state.phone} onChange={this.handlePhoneChange} />
            </label>

            <div className="elementspace"></div>

            <label>
              Do you want to lose weight?

              <div className="elementspace2"></div>

              <div onChange={this.handleWeightChange}>
                Yes <input className="tab" type="radio" name="loseweight" value="Y" />
                No <input type="radio" name="loseweight" value="N" />
              </div>

            </label>

            <div className="elementspace"></div>

            <label className={this.state.loseweight === 'Y' ? '' : 'hidden'}>
              How long have you struggled with your weight?

              <div className="elementspace2"></div>

              <div onChange={this.handleStruggleChange}>
                1 - 11 months <input className="tab2" type="radio" name="struggle" value="MNT" />
                1 - 10 years <input className="tab2" type="radio" name="struggle" value="YRS" />
                All my life <input type="radio" name="struggle" value="AML" />
              </div>

            </label>


            <label className={this.state.loseweight === 'N' ? '' : 'hidden'}>
              Do you eat healthy?

              <div className="elementspace2"></div>

              <div onChange={this.handleEatChange}>
                Yes <input className="tab" type="radio" name="eat" value="Y" />
                No <input type="radio" name="eat" value="N" />
              </div>

            </label>

            <div className="elementspace"></div>

            <label className={this.state.eat === '' ? 'hidden' : ''}>
              What is your water intake? (measured by 16oz bottle)

              <div className="elementspace2"></div>

              <div onChange={this.handleWaterChange}>
                Less than 3 bottles/day <input className="tab2" type="radio" name="water" value="L" />
                More than 3 bottles/day <input type="radio" name="water" value="M" />
              </div>

            </label>

            <div className="elementspace"></div>

            <label className={this.state.water === '' ? 'hidden' : ''}>
              Do you need help with meal planning?

              <div className="elementspace2"></div>

              <div onChange={this.handleMealChange}>
                Yes <input className="tab" type="radio" name="meal" value="Y" />
                No <input type="radio" name="meal" value="N" />
              </div>

            </label>

            <div className="elementspace"></div>

            <p className={this.state.submitted ? '' : 'hidden'}>
              Thanks for joining our mailing list, someone will be in contact with you shortly
            </p>

            <div className="elementspace"></div>

          
            <input className={(this.state.struggle !== '' && this.state.loseweight === 'Y') || 
                              (this.state.loseweight === 'N' && this.state.meal !== '') ? '' : 'hidden'}
            id="button" type="Submit" />

          </form>
        </div>
      );
    }
}

export default App;
