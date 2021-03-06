//finite state machine
const machine = {
    state: "SOBER",
    transitions: {
      SOBER: {
        drink: function(beverage, second) {
          console.log("current state", this.state);
          console.log("\tdrinking", beverage.type); //second would be undefined
          if (beverage.type == "alcohol") {
            console.log("\tAdios inhibitions!");
            this.changeState("DRUNK");
          } else {
            console.log("\tThat quenched my thirst!");
          }
        }
      },
      DRUNK: {
        drink: function(beverage) {
          console.log("current state", this.state);
          console.log("\tdrinking", beverage.type);
          if (beverage.type == "alcohol") {
            console.log("\tAdios pants!");
            this.changeState("REALLYDRUNK");
          } else {
            console.log("\tI said what?");
            this.changeState("SOBER");
          }
        }
      },
      REALLYDRUNK: {
        drink: function(beverage) {
          console.log("current state", this.state);
          console.log("\tdrinking ", beverage.type);
          if (beverage.type == "alcohol") {
            let dice = Math.floor(Math.random() * 2); // 0 or 1
            if (dice) {
              this.dispatch("throwup", {});
            } else {
              this.dispatch("passout", {});
            }
          } else {
            this.changeState("DRUNK");
          }
        },
        passout: function() {
          console.log("\tPassing out. zzzzzzzzz");
          this.changeState("ASLEEP");
        },
        throwup: function() {
          console.log("\tBlaaaaaaaaaaa....When did I eat that?");
          this.dispatch("passout", {});
        }
      },
      ASLEEP: {
        wake: function() {
          console.log("current state", this.state);
          console.log("\tWaking up.");
          this.changeState("HUNGOVER");
        }
      },
      HUNGOVER: {
        openeyes: function() {
          console.log("current state", this.state);
          console.log("\tTurn off the sun please");
        },
        drink: function(beverage) {
          console.log("current state", this.state);
          console.log("\tdrinking", beverage.type);
          if (beverage.type == "alcohol") {
            console.log("\tIs it never again yet?");
            this.changeState("DRUNK");
          } else {
            console.log("\tNever again.");
            this.changeState("SOBER");
          }
        }
      }
    },
    dispatch(actionName, ...payload) {
      const actions = this.transitions[this.state];
      const action = this.transitions[this.state][actionName];
  
      if (action) {
        action.apply(machine, ...payload);
      } else {
        //action is not valid for current state
      }
    },
    changeState(newState) {
      //validate that newState actually exists
      this.state = newState;
    }
  };
  
  let Jeff = Object.create(machine, {
    name: {
      writable: false,
      enumerable: true,
      value: "Jeff"
    }
  });
  
  // Jeff.dispatch("drink", [{ type: "alcohol" }]);
  // Jeff.dispatch("drink", [{ type: "alcohol" }]);
  // Jeff.dispatch("drink", [{ type: "alcohol" }]);
  // Jeff.dispatch("wake");
  // Jeff.dispatch("openeyes");
  // Jeff.dispatch("drink", [{ type: "water" }]);
  Jeff.dispatch("eat");
  console.log(Jeff.state)