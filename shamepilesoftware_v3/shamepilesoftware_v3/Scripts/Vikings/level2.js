// Define the number of the levels.
var levelNum = 2;

// Define the physical dimensions of the level. 
var blocks = [
    {
        x : 320, // Square block.
        y : 200,
        width : 30,
        height : 30,
        color: "rgba(0,0,0,1)",
        url : "../Images/blocks.jpg"
    },
    {
        x : 200, // Square block.
        y : 120,
        width : 30,
        height : 30,
        color: "rgba(0,0,0,1)",
        url : "../Images/blocks.jpg"
    },
    {
        x : 340, // Thin platform.
        y : 40,
        width : 125,
        height : 5,
        color : "rgba(170,69,19,1)"
    },
    {
        x : 540, // Tall rectangular block.
        y : 80,
        width : 30,
        height : 180,
        color: "rgba(0,0,0,1)"
    }, 
    { 
        x : 600, // Square block.
        y : 200,
        width : 30,
        height : 30,
        color: "rgba(0,0,0,1)",
        url : "../Images/blocks.jpg"
    },
    { 
        x : 700, // Square block.
        y : 200,
        width : 30,
        height : 30,
        color: "rgba(0,0,0,1)",
        url : "../Images/blocks.jpg"
    },
    { 
        x : 780, // Square block.
        y : 150,
        width : 30,
        height : 30,
        color: "rgba(0,0,0,1)",
        url : "../Images/blocks.jpg"
    },
    { 
        x : 830, // Square block.
        y : 100,
        width : 30,
        height : 30,
        color: "rgba(0,0,0,1)",
        url : "../Images/blocks.jpg"
    },
    {
        x : 920, // Thin platform.
        y : 80,
        width : 200,
        height : 5,
        color : "rgba(170,69,19,1)"
    },
    { 
        x : 1220, // Square block.
        y : 90,
        width : 30,
        height : 30,
        color: "rgba(0,0,0,1)",
        url : "../Images/blocks.jpg"
    },
    {
        x : 1370, // Tall rectangular block.
        y : 120,
        width : 30,
        height : 150,
        color: "rgba(0,0,0,1)"
    }  
];

var ground = {
    x: 0, // Define the ground.
    y: 280,
    width: 1500,
    height: 20,
    color: "rgba(100,100,100,1)"
};

var background = "url(Content/Images/BG_A033.jpg)";