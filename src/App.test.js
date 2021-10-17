import rewire from "rewire"
import React from "react"
import ReactDOM from "react-dom"
const App = rewire("./App")
const $ = App.__get__("$")
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// @ponicode
describe("$", () => {
    test("0", () => {
        let callFunction = () => {
            $("--selector=%s")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            $("len")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            $("%s > option")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            $("*")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            $("kind")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            $(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("componentDidMount", () => {
    let inst

    beforeEach(() => {
        inst = new App.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentDidMount()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("tryToInitializeStuff", () => {
    let inst

    beforeEach(() => {
        inst = new App.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.tryToInitializeStuff()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("draw", () => {
    let inst

    beforeEach(() => {
        inst = new App.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.draw()
        }
    
        expect(callFunction).not.toThrow()
    })
})
