// Define the order of the levels.
var levelNum = 1;

// Define the physical dimensions of the level. 
var blocks = [
    {
        x : 320, // Square block.
        y : 160,
        width : 30,
        height : 30,
        color: "rgba(0,0,0,1)",
        url : "../Images/blocks.jpg"
    },
    { 
        x : 380, // Square block.
        y : 120,
        width : 30,
        height : 30,
        color: "rgba(0,0,0,1)",
        url : "../Images/blocks.jpg"
    },
    {
        x : 500,  // Thin platform
        y : 80,
        width : 150,
        height : 5,
        color : "rgba(170,69,19,1)"
    },
    {
        x : 725, // Thin platform.
        y : 40,
        width : 125,
        height : 5,
        color : "rgba(170,69,19,1)"
    },
    { 
        x : 980, // Square block.
        y : 80,
        width : 30,
        height : 30,
        color: "rgba(0,0,0,1)",
        url : "../Images/blocks.jpg"
    },
    { 
        x : 1100, // Square block.
        y : 80,
        width : 30,
        height : 30,
        color: "rgba(0,0,0,1)",
        url : "../Images/blocks.jpg"
    },
    {
        x : 1230, // Thin platform.
        y : 100,
        width : 100,
        height : 5,
        color : "rgba(170,69,19,1)"
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

var background = "url(Content/Images/MountainSandBG_01.png)";
//var background = "url(Images/BG_A033.jpg)";