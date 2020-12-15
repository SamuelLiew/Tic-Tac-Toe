class Model {
  constructor() {
    (this.gamedata = []),
      (this.players = [
        { playerId: "player1", turn: true },
        { playerId: "player2", turn: false },
      ]);
    this.player1turn = true;
    this.player1wins = [];
    this.player2wins = [];
  }
  whoseTurn() {
    //! This one fills in the turn returns "player1" or "player2"
    if (this.gamedata.length === 0) {
      this.player1turn = false;
      return this.player1turn;
    } else {
      this.players = this.players.map((player) =>
        player.turn === true
          ? { playerId: player.playerId, turn: this.player1turn }
          : { playerId: player.playerId, turn: !this.player1turn }
      );
      const turnArray = this.players.map((player) =>
        player.turn === true ? player.playerId : "Not It Bro"
      );
      turnArray.splice(turnArray.indexOf("Not It Bro"), 1);
      if (this.player1turn === true) {
        this.player1turn = false;
      } else {
        this.player1turn = true;
      }
      return this.player1turn;
    }
  }

  addData(id, handler, handler2) {
    // ! We will know the ID by using event listeners
    //TODO: order: 1(highest priority)
    this.whoseTurn();
    const newdata = {
      id: id,
      cross: !this.player1turn,
    };
    this.gamedata.push(newdata);
    this.bindData(handler);
    this.resetData(handler2);
  }
  pointCondition() {
    //TODO: order: 2
    //! Tells us who won, "player1" or "player2"
    const crossArray = [];
    const circleArray = [];
    this.gamedata.map((section) => {
      section.cross === true
        ? crossArray.push(section.id)
        : circleArray.push(section.id);
    });
    const combinations = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];
    const crossSimiliar = [];
    const circleSimiliar = [];
    for (var i = 0; i < combinations.length; i++) {
      crossArray.map((num) => {
        for (var j = 0; j < combinations[i].length; j++) {
          if (combinations[i][j] === num) {
            crossSimiliar.push(true);
          }
        }
      });
      crossSimiliar.push(" ");

      circleArray.map((num) => {
        for (var j = 0; j < combinations[i].length; j++) {
          if (combinations[i][j] === num) {
            circleSimiliar.push(true);
          }
        }
      });
      circleSimiliar.push(" ");
    }

    const crossPoint = crossSimiliar
      .toString()
      .split(" ")
      .includes(",true,true,true,");
    const crossPoint2 = crossSimiliar
      .toString()
      .split(" ")
      .includes("true,true,true,");
    const circlePoint = circleSimiliar
      .toString()
      .split(" ")
      .includes(",true,true,true,");
    const circlePoint2 = circleSimiliar
      .toString()
      .split(" ")
      .includes("true,true,true,");
    var point;
    if (crossPoint || crossPoint2) {
      point = "player1";
    } else if (circlePoint || circlePoint2) {
      point = "player2";
    } else {
      point = "nobody";
    }
    return point;
  }

  bindData(handler) {
    handler(this.pointCondition());
  }
  resetData(handler) {
    if (
      this.gamedata.length === 9 ||
      this.pointCondition() === "player1" ||
      this.pointCondition() === "player2"
    ) {
      handler(this.gamedata);
      this.gamedata = [];
      this.player1turn = true;
    }
  }
}

class View {
  constructor() {
    this.section1 = document.querySelector(".id1");
    this.section2 = document.querySelector(".id2");
    this.section3 = document.querySelector(".id3");
    this.section4 = document.querySelector(".id4");
    this.section5 = document.querySelector(".id5");
    this.section6 = document.querySelector(".id6");
    this.section7 = document.querySelector(".id7");
    this.section8 = document.querySelector(".id8");
    this.section9 = document.querySelector(".id9");
    this.score1 = document.querySelector(".score1");
    this.score2 = document.querySelector(".score2");
  }

  displayShapes(id, turn) {
    const sectionId = "#section%id%";
    const newSectionId = sectionId.replace("%id%", id);
    if (turn === true) {
      const html =
        '<div class="x"><div class="xbox"><div class="box1"></div><div class="box2"></div><div class="box3"></div><div class="box4"></div></div></div>';
      document
        .querySelector(newSectionId)
        .insertAdjacentHTML("afterbegin", html);
    } else {
      const html = '<div class="circle"><div class="circlebox"></div></div>';
      document
        .querySelector(newSectionId)
        .insertAdjacentHTML("afterbegin", html);
    }
  }
  bindAddShapes(handler) {
    this.section1.addEventListener("click", (event) => {
      if (event) {
        event.target.parentNode.setAttribute("disabled", "disabled");
        console.log(event.target.parentNode);
        handler(1);
      }
    });
    this.section2.addEventListener("click", (event) => {
      if (event) {
        event.target.parentNode.setAttribute("disabled", "disabled");
        handler(2);
      }
    });
    this.section3.addEventListener("click", (event) => {
      if (event) {
        event.target.parentNode.setAttribute("disabled", "disabled");
        handler(3);
      }
    });
    this.section4.addEventListener("click", (event) => {
      if (event) {
        event.target.parentNode.setAttribute("disabled", "disabled");
        handler(4);
      }
    });
    this.section5.addEventListener("click", (event) => {
      if (event) {
        event.target.parentNode.setAttribute("disabled", "disabled");
        handler(5);
      }
    });
    this.section6.addEventListener("click", (event) => {
      if (event) {
        event.target.parentNode.setAttribute("disabled", "disabled");
        handler(6);
      }
    });
    this.section7.addEventListener("click", (event) => {
      if (event) {
        event.target.parentNode.setAttribute("disabled", "disabled");
        handler(7);
      }
    });
    this.section8.addEventListener("click", (event) => {
      if (event) {
        event.target.parentNode.setAttribute("disabled", "disabled");
        handler(8);
      }
    });
    this.section9.addEventListener("click", (event) => {
      if (event) {
        event.target.parentNode.setAttribute("disabled", "disabled");
        handler(9);
      }
    });
  }

  changeScore(data, player1wins, player2wins) {
    if (data === "player1") {
      player1wins.push(data);
    } else if (data === "player2") {
      player2wins.push(data);
    }
    if (player1wins.length === 0) {
      this.score1.textContent = 0;
    } else {
      this.score1.textContent = player1wins.length;
    }
    if (player2wins.length === 0) {
      this.score2.textContent = 0;
    } else {
      this.score2.textContent = player2wins.length;
    }
  }
  resetVisuals(arrayOfData) {
    // const parent8 = this.section8.childNodes[1];
    arrayOfData.map((data) => {
      if (data.id === 1) {
        const parent = this.section1.childNodes[1];
        parent.removeChild(parent.childNodes[0]);
        this.section1.parentNode.childNodes[1].removeAttribute(
          "disabled",
          "disabled"
        );
      } else if (data.id === 2) {
        const parent = this.section2.childNodes[1];
        parent.removeChild(parent.childNodes[0]);
        this.section1.parentNode.childNodes[3].removeAttribute(
          "disabled",
          "disabled"
        );
      } else if (data.id === 3) {
        const parent = this.section3.childNodes[1];
        parent.removeChild(parent.childNodes[0]);
        this.section1.parentNode.childNodes[5].removeAttribute(
          "disabled",
          "disabled"
        );
      } else if (data.id === 4) {
        const parent = this.section4.childNodes[1];
        parent.removeChild(parent.childNodes[0]);
        this.section1.parentNode.childNodes[7].removeAttribute(
          "disabled",
          "disabled"
        );
      } else if (data.id === 5) {
        const parent = this.section5.childNodes[1];
        parent.removeChild(parent.childNodes[0]);
        this.section1.parentNode.childNodes[9].removeAttribute(
          "disabled",
          "disabled"
        );
      } else if (data.id === 6) {
        const parent = this.section6.childNodes[1];
        parent.removeChild(parent.childNodes[0]);
        this.section1.parentNode.childNodes[11].removeAttribute(
          "disabled",
          "disabled"
        );
      } else if (data.id === 7) {
        const parent = this.section7.childNodes[1];
        parent.removeChild(parent.childNodes[0]);
        this.section1.parentNode.childNodes[13].removeAttribute(
          "disabled",
          "disabled"
        );
      } else if (data.id === 8) {
        const parent = this.section8.childNodes[1];
        parent.removeChild(parent.childNodes[0]);
        this.section1.parentNode.childNodes[15].removeAttribute(
          "disabled",
          "disabled"
        );
      } else if (data.id === 9) {
        const parent = this.section9.childNodes[1];
        parent.removeChild(parent.childNodes[0]);
        this.section1.parentNode.childNodes[17].removeAttribute(
          "disabled",
          "disabled"
        );
      }
      // console.log(parent.parentNode.childNodes[1].childNodes);
    });
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.bindAddShapes(this.handleDisplayingData);
    this.view.bindAddShapes(this.handleAddData);
  }
  handleAddData = (sectionId) => {
    this.model.addData(sectionId, this.handleChangingData, this.handleVisuals);
  };
  handleDisplayingData = (sectionId) => {
    this.view.displayShapes(sectionId, this.model.player1turn);
  };
  handleChangingData = (data) => {
    this.view.changeScore(data, this.model.player1wins, this.model.player2wins);
  };
  handleVisuals = (arrayOfData) => {
    this.view.resetVisuals(arrayOfData);
  };
}

const app = new Controller(new Model(), new View());
