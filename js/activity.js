define(function (require) {
    var activity = require("sugar-web/activity/activity");
    var icon = require("sugar-web/graphics/icon");
    var datastore = require("sugar-web/datastore");
    var active=0;
    var colourarray=["red","blue","green","black"];
    var cid=0,points=0;
    var count;
    var counter;
    var highscore=0;


    // Manipulate the DOM only when it is ready.
    require(['domReady!'], function (doc) {

        // Initialize the activity.
        activity.setup();

        // Colorize the activity icon.
        var activityButton = document.getElementById("activity-button");
        activity.getXOColor(function (error, colors) {
            icon.colorize(activityButton, colors);
        });

        // Make the activity stop with the stop button.
        var stopButton = document.getElementById("stop-button");
        var datastoreObject = activity.getDatastoreObject();
        stopButton.onclick = function () {
            console.log("score : "+highscore);
            var jsonData = JSON.stringify(highscore.toString());
            datastoreObject.setDataAsText(jsonData);
            datastoreObject.save(function () {
                activity.close();
            });
         };

        

        createCanvas();

        function createCanvas()//to create the table
        {
            var side = 10;
            var tbody = document.getElementById( "tablebody" );
            for ( var i = 0; i < side; i++ )
            {
                var row = document.createElement( "tr" );
                for ( var j = 0; j < side; j++ )
                {
                    var cell = document.createElement( "td" );
                    cell.onclick = processMouseMove;
                    row.appendChild( cell );
                } // end for
                tbody.appendChild( row );
            } // end for
        }

        

        function onLoaded(error, metadata, data) {
            console.log(metadata);
            console.log(data);
            highscore=parseInt(JSON.parse(data));
            
            console.log(highscore);
            document.getElementById("highscore").innerHTML=highscore;
        }

        datastoreObject.loadAsText(onLoaded);

        document.getElementById("highscore").innerHTML=highscore;  

        function processMouseMove( e )
        {
          // get the event object from IE
            if ( !e )
            var e = window.event;
            //this.style.backgroundColor = "blue";
            if(active==1)
            {
              this.style.backgroundColor=colourarray[cid];
              points++;
            }
              // turn the cell red if the Shift key is pressed
              //if ( e.shiftKey )
              //this.style.backgroundColor = "red";
        }

        var starting= document.getElementById("startbutton");
        starting.onclick = function(){
            active=1;
            starttimer();
        };

        var resetting= document.getElementById("resetbutton");
        resetting.onclick = function(){
            clearcell();
        };

        

        var cred= document.getElementById("red");
        cred.onclick = function(){
            setcolor(0);
        };

        var cblue= document.getElementById("blue");
        cblue.onclick = function(){
            setcolor(1);
        };

        var cgreen= document.getElementById("green");
        cgreen.onclick = function(){
            setcolor(2);
        };

        var cblack= document.getElementById("black");
        cblack.onclick = function(){
            setcolor(3);
        };
        /*
      function colourcell(cellid)
      {
          cellid.style.backgroundColor=colourarray[cid];
          points++;
      }*/
      

      function setcolor(colour)
      {
          
          cid=parseInt(colour);
      }

      
      
      function clearcell()
      {
          points=0;
          for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {                   
            var x=document.getElementById('myTable').rows[i].cells[j];
            x.style.backgroundColor="#c0c0c0";
            }
          }
      }
      
      
      

      function starttimer()
      {   
          active=1;
          points=0;
          count=10;
          clearcell();
          counter=setInterval(timer, 1000);
      }

      function timer()
      {
          count=count-1;
          
          if(count==0)
          {
            gameComplete();
          }

          if (count <= 0)
          {
            clearInterval(counter);
            return;
          }

          document.getElementById("timer").innerHTML=count + " secs"; 

      }


      function gameComplete()
      {
          active=0;
          document.getElementById("timer").innerHTML="GAME OVER!! You scored "+points+" point/s";
          
          if(points>highscore)
            {document.getElementById("highscore").innerHTML=points;
             highscore=points;
            }

      }

    });

});
