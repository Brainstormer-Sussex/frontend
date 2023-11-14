import $ from 'jquery'
let i;

export default function useKanoodleWithPuzzlePiece() {
    var KanoodleBoardConfig = [
        "XXXXXXXXXXX",
        "XXXXXXXXXXX",
        "XXXXXXXXXXX",
        "XXXXXXXXXXX",
        "XXXXXXXXXXX",
    ];

    var puzzlePieces = [
        {
            Name: "L",
            Layout: [
                [1, 1], [1, 2], [1, 3], [1, 4],
                [2, 1],
            ]
        },
        {
            Name: "l",
            Layout: [
                [1, 1],
                [2, 1], [1, 2]
            ]
        },
        {
            Name: "i",
            Layout: [
                [1, 1], [1, 2], [1, 3],
                [2, 3],
                [3, 3],
            ]
        },
        {
            Name: "N",
            Layout: [
                [1, 1],
                [2, 1], [2, 2], [2, 3],
            ]
        },
        {
            Name: "V",
            Layout: [
                [1, 2],
                [2, 1], [2, 2],
                [3, 2],
                [4, 2],
            ]
        },
        {
            Name: "Y",
            Layout: [
                [1, 1], [1, 2],
                [2, 1], [2, 2],
            ]
        },
        {
            Name: "P",
            Layout: [
                [1, 1],
                [2, 1], [2, 2],
                [3, 2],
                [4, 2],
            ]
        },
        {
            Name: "S",
            Layout: [
                [1, 1], [1, 2],
                [2, 2], [2, 3],
                [3, 3],
            ]
        },
        {
            Name: "U",
            Layout: [
                [1, 2],
                [2, 1], [2, 2], [2, 3],
                [3, 2], // [3, 2],
            ]
        },
        {
            Name: "X",
            Layout: [
                [1, 1], [1, 2], [1, 3],
                [2, 2], [2, 3],
            ]
        },
        {
            Name: "I",
            Layout: [
                [1, 1], [1, 2],
                [2, 2],
                [3, 1], [3, 2],
            ]
        },
        {
            Name: "W",
            Layout: [
                [1, 1], [1, 2], [1, 3], [1, 4],
            ]
        },
    ];


    var Shapes = [];

    var Board = {};

    var WebWorker = null;
    var Solutions = 0;
    var SolHash = {};

    Object.prototype.clone = function () {
        var newObj = (this instanceof Array) ? [] : {};
        for (i in this) {
            if (i === 'clone') continue;
            if (this[i] && typeof this[i] === "object") {
                newObj[i] = this[i].clone();
            } else newObj[i] = this[i]
        } return newObj;
    };

    function StartKanoodleWorker() {
        Initialise();

        try {
            if (typeof (Worker) !== "undefined") {
                WebWorker = new Worker(`${process.env.REACT_APP_PUBLIC_URL}/worker/app.worker.js`);
                if (window.Worker) {
                    // Web workers are supported
                    console.log("Web workers are supported")
                
                    WebWorker.addEventListener('message', MessageCb, false);
                    WebWorker.postMessage({ 'MsgType': "start", 'Shapes': JSON.stringify(Shapes), 'Board': JSON.stringify(Board) });
                } else {
                    // Web workers are not supported
                    console.log("Web workers are not supported")
                }
            }
            else {
                WorkerStopped();
                alert("This browser does not support Web Workers! Try Chrome, Firefox, Opera or Safari");
            }
        }
        catch (err) {
            console.log("error: ", err)
        }
    }

    function StopKanoodleWorker() {
        WebWorker.terminate();
        WorkerStopped();
    }

    function WorkerStopped() {
        WebWorker = null;
        $("#stopbtn").remove();
    }

    function MessageCb(Event) {
        var Data = Event.data;
        var Board;
        console.log("--MessageCb--");
        console.log("MsgType:",Data.MsgType)
        switch (Data.MsgType) {
            case "debug":
                Debug(Data.Msg);
                break;

            case "solution":
                Board = JSON.parse(Data.Board);
                if (!DuplicateSolution(Board, Shapes)) {
                    DumpBoard(Board, Shapes);
                }
                break;

            case "workupdate":
                Board = JSON.parse(Data.Board);
                UpdateWorkBoard(Board);
                break;

            case "finished":
                StopKanoodleWorker();
                break;

        }
    }

    function DuplicateSolution(Board, Shapes) {
        var Dupe = false;
        var String = "";
        var CurShape;
        var Row;
        var Col;

        for (Row = 0; Row < Board.Height; Row++) {
            for (Col = 0; Col < Board.Width; Col++) {
                CurShape = Board.Layout[Col][Row];
                if (CurShape >= 0) String += Shapes[CurShape].Name;
            }
        }

        if (SolHash[String] === undefined) {
            SolHash[String] = null;
        }
        else {
            Dupe = true;
        }

        return Dupe;
    }

    function Initialise() {
        var CurShape;
        var i, j, k;

        //    Debug("Using " + puzzlePieces.length + " pentominoes: ", puzzlePieces);
        for (i = 0; i < puzzlePieces.length; i++) {
            Shapes[i] = {}
            Shapes[i].Layout = [];
            Shapes[i].Name = puzzlePieces[i].Name;
            Shapes[i].Colour = puzzlePieces[i].Colour;
            console.log("shapes: ", Shapes)
            for (k = 0; k < 3; k++) {
                console.log('k: ', k)
                CurShape = puzzlePieces[i].Layout;
                switch (k) {
                    case 0:
                        CurShape = ShiftShape(CurShape);
                        CurShape.sort(LocCompare);
                        break;
                    case 1:
                        CurShape = FlipShapeX(CurShape);
                        break;
                    case 2:
                        CurShape = FlipShapeY(CurShape);
                        break;
                }
                for (j = 0; j < 4; j++) {
                    if (!DuplicateLayout(Shapes[i].Layout, CurShape)) {
                        AddLayout(i, CurShape);
                    }
                    CurShape = RotateShape(CurShape);
                }
            }
            /*
                    Debug("Pentomino " + puzzlePieces[i].Name + " has " + Shapes[i].Layout.length + " layouts");
                    for(var l=0; l<Shapes[i].Layout.length; l++){
                        Debug(Shapes[i].Layout[l].toString())
                    }
            */
        }

        Board.Width = 0;
        Board.Height = KanoodleBoardConfig.length;
        for (i = 0; i < KanoodleBoardConfig.length; i++) {
            Board.Width = Math.max(Board.Width, KanoodleBoardConfig[i].length);
        }

        Board.Layout = [];
        for (i = 0; i < Board.Width; i++) {
            var Col = new Array();
            for (j = 0; j < Board.Height; j++) {
                if (KanoodleBoardConfig[j].substring(i, i + 1) === "X") Col.push(-1);
                else Col.push(-2);
            }
            Board.Layout.push(Col);
        }

        DrawWorkBoard(Board);
    }

    function AddLayout(ShapeNo, Layout) {
        Shapes[ShapeNo].Layout.push(Layout);
    }

    function DuplicateLayout(Layouts, Shape) {
        for (var i = 0; i < Layouts.length; i++) {
            if (CompareShape(Layouts[i], Shape)) return true;
        }

        return false;
    }

    function CompareShape(Shape1, Shape2) {
        if (Shape1.length !== Shape2.length) return false;

        for (var i = 0; i < Shape1.length; i++) {
            if (Shape1[i][0] !== Shape2[i][0]) return false;
            if (Shape1[i][1] !== Shape2[i][1]) return false;
        }

        return true;
    }

    function ShiftShape(Shape) {
        // console.log("Shape:  ",Shape);
        var NewShape = Shape.clone();
        // console.log("NewShape:  ",NewShape);
        var MinX = NewShape[0][0];
        var MinY = NewShape[0][1];
        var i;

        for (i = 0; i < NewShape.length; i++) {
            // console.log(NewShape, "  ",NewShape[i], " ", NewShape[i][0]);
            MinX = Math.min(MinX, NewShape[i][0]);
            MinY = Math.min(MinY, NewShape[i][1]);
        }

        for (i = 0; i < NewShape.length; i++) {
            NewShape[i][0] -= MinX;
            NewShape[i][1] -= MinY;
        }

        return NewShape;
    }

    function RotateShape(Shape) {
        var NewShape = Shape.clone();

        for (var i = 0; i < NewShape.length; i++) {
            var x = NewShape[i][0];
            var y = NewShape[i][1];
            NewShape[i][0] = 6 - y;
            NewShape[i][1] = x;
        }
        NewShape.sort(LocCompare);

        return ShiftShape(NewShape);
    }

    function FlipShapeX(Shape) {
        var NewShape = Shape.clone();

        for (var i = 0; i < NewShape.length; i++) {
            NewShape[i][0] = 6 - NewShape[i][0];
        }
        NewShape.sort(LocCompare);

        return ShiftShape(NewShape);
    }

    function FlipShapeY(Shape) {
        var NewShape = Shape.clone();

        for (var i = 0; i < NewShape.length; i++) {
            NewShape[i][1] = 6 - NewShape[i][1];
        }
        NewShape.sort(LocCompare);

        return ShiftShape(NewShape);
    }

    function LocCompare(Loc1, Loc2) {
        if (Loc1[0] < Loc2[0]) return -1;
        if (Loc1[0] > Loc2[0]) return 1;
        if (Loc1[1] < Loc2[1]) return -1;
        if (Loc1[1] > Loc2[1]) return 1;
        return 0;
    }

    function DumpBoard(Board, Shapes) {
        var Row;
        var Col;
        var Table;

        Table = '<table class="st">';
        for (Row = 0; Row < Board.Height; Row++) {
            Table += '<tr class="sr">';
            for (Col = 0; Col < Board.Width; Col++) {
                Table += '<td class="sc ' + CellClass(Board, Col, Row) + '"/>';
            }
            Table += "</tr>"
        }
        Table += "</table>";

        $("#results").append(Table);

        $("#solcnt").text(++Solutions);
    }

    function DrawWorkBoard(Board) {
        var Row;
        var Col;
        var Table;

        Table = '<table id="worktable" class="wt">';
        for (Row = 0; Row < Board.Height; Row++) {
            Table += '<tr class="wr">';
            for (Col = 0; Col < Board.Width; Col++) {
                Table += '<td id="workcell' + Col + "x" + Row + '" class="wc"/>';
            }
            Table += "</tr>"
        }
        Table += "</table>";

        $("#work").append(Table);
    }

    function UpdateWorkBoard(Board) {
        console.log("--UpdateWorkBoard--")
        var Row;
        var Col;
        var Class;

        for (Row = 0; Row < Board.Height; Row++) {
            for (Col = 0; Col < Board.Width; Col++) {
                Class = CellClass(Board, Col, Row);
                $("#workcell" + Col + "x" + Row).attr('class', "wc " + Class);
            }
        }
    }

    function CellClass(Board, Col, Row) {
        var CurShape;
        var Class;

        CurShape = Board.Layout[Col][Row];

        if (CurShape === -2 && (Row === 0 || Board.Layout[Col][Row - 1] === -2)) Class = " btn";
        else if (Row > 0 && Board.Layout[Col][Row - 1] === CurShape) Class = " btd";
        else Class = " bts";

        if (CurShape === -2 && (Row === Board.Height - 1 || Board.Layout[Col][Row + 1] === -2)) Class += " bbn";
        else if (Row < Board.Height - 1 && Board.Layout[Col][Row + 1] === CurShape) Class += " bbd";
        else Class += " bbs";

        if (CurShape === -2 && (Col === 0 || Board.Layout[Col - 1][Row] === -2)) Class += " bln";
        else if (Col > 0 && Board.Layout[Col - 1][Row] === CurShape) Class += " bld";
        else Class += " bls";

        if (CurShape === -2 && (Col === Board.Width - 1 || Board.Layout[Col + 1][Row] === -2)) Class += " brn";
        else if (Col < Board.Width - 1 && Board.Layout[Col + 1][Row] === CurShape) Class += " brd";
        else Class += " brs";

        if (CurShape >= 0) Class += " c" + Shapes[CurShape].Name;

        return Class;
    }

    function Debug(Msg) {
        $("#debug").append('<p class="debug">' + Msg + "</p>");
    }

    return {
        StartKanoodleWorker,
        StopKanoodleWorker,
        WorkerStopped,
        MessageCb,
    }
}
