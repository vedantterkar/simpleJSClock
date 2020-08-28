
    const imgs = ["clock0.png", "clock1.jpg", "clock2.jpeg", "clock3.png", "clock4.jpg", "clock5.jpg", "clock6.jpeg", "clock7.png", "clock8.png"];
    const strs = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen",
                    "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    const prefix = ["", "", "twenty", "thirty", "forty", "fifty"];
    let mode = true;
    window.onload = function(){
        startClock();
        var watchFaces = document.getElementsByClassName("clockFaceCnt");
        for(var i = 0; i < watchFaces.length; i++)
        {
            watchFaces[i].addEventListener("click", changeClockFace, false); 
            if(i < 9)
            {
                watchFaces[i].style.backgroundImage = "url(clkimgs/"+imgs[i]+")";
                watchFaces[i].style.backgroundSize = "100% 100%";
            }
            
        }
        document.getElementsByClassName("clockFaceCnt")[0].click();
    }
    function startClock()
    {
        var d = new Date();
        var hh = d.getHours() % 12;
        var mm = d.getMinutes();
        var ss = d.getSeconds();
        var secdiv = document.getElementsByClassName("secondHand")[0],
        mindiv = document.getElementsByClassName("minuteHand")[0],
        hrdiv = document.getElementsByClassName("hourHand")[0],
        hrText = document.getElementsByClassName("hourText")[0],
        mnText = document.getElementsByClassName("minuteText")[0],
        scText = document.getElementsByClassName("secondText")[0];
        var secdeg = ss * 6;
        var mindeg = mm * 6;
        var hrdeg = hh * 30;
        secdiv.style.transform       = 'rotate('+(secdeg )+'deg)'; 
        mindiv.style.transform       = 'rotate('+(mindeg)+'deg)'; 
        hrdiv.style.transform       = 'rotate('+(hrdeg)+'deg)'; 

        var hrStr = d.getHours() % 12 == 0 ? "Twelve" : strs[d.getHours() % 12];
        var mnStr = "", scStr = "";
        var hrNum = d.getHours() % 12 == 0 ? "12" : ""+(d.getHours() % 12);
        hrNum = hrNum.length == 1 ? "0"+hrNum : hrNum;
        var mnNum = ""+d.getMinutes();
        mnNum = mnNum.length == 1 ? "0"+mnNum : mnNum;
        var scNum = ""+d.getSeconds();
        scNum = scNum.length == 1 ? "0"+scNum : scNum;
        var numStr = hrNum+":"+mnNum+":"+scNum;
        if(mm < 20)
        {
               mnStr = strs[mm];
        }
        else
        {
            mnStr = prefix[Math.floor(mm/10)]+" "+strs[mm%10];
        }
        if(ss < 20)
        {
               scStr = strs[ss];
        }
        else
        {
            scStr = prefix[Math.floor(ss/10)]+" "+strs[ss%10];
        }
        hrText.innerHTML = mode ? "<br />"+hrStr : "<p style='font-size: 30px;'><br /><hr />"+numStr+"<hr /></p>";
        mnText.innerHTML = mode ? mnStr: "";
        scText.innerHTML = mode ? scStr: "";
        setTimeout(startClock, 1000);
    }

    function changeClockFace(e, idx)
    {
        var evt = e || window.event;
        var t = evt.target;
        var sel = document.getElementsByClassName("selected")[0];
        let  hrText = document.getElementsByClassName("hourText")[0],
                    mnText = document.getElementsByClassName("minuteText")[0],
                    scText = document.getElementsByClassName("secondText")[0];
        let secdiv = document.getElementsByClassName("secondHand")[0],
            mindiv = document.getElementsByClassName("minuteHand")[0],
            hrdiv = document.getElementsByClassName("hourHand")[0],
            wcDiv = document.getElementsByClassName("watchCenter")[0];

        sel.classList.remove("selected");
        t.classList.add("selected");
        let index = idx? idx : Array.from(evt.target.parentElement.children).indexOf(t);
        mode = true;
            hrText.style.visibility = "hidden";
            mnText.style.visibility = "hidden";
            scText.style.visibility = "hidden"; 
            wcDiv.style.visibility = "visible";
            hrdiv.style.visibility = "visible";
            secdiv.style.visibility = "visible";
            mindiv.style.visibility = "visible";
        if(index < 7)
        {
            document.getElementsByClassName("watchBody")[0].style.backgroundImage = "url(clkimgs/"+imgs[index]+")";
            document.getElementsByClassName("watchBody")[0].style.backgroundSize = "100% 100%";

        }
        else if(index == 7 || index == 8)
        {
            hrText.style.visibility = "visible";
            mnText.style.visibility = "visible";
            scText.style.visibility = "visible"; 
            document.getElementsByClassName("watchBody")[0].style.background = index == 7 ? "linear-gradient(rgba(0,0,0,1), rgba(0,0,0,0.6))" : "linear-gradient(rgba(255,99,33,1), rgba(255,99,33,0.6))";
            wcDiv.style.visibility = "hidden";
            hrdiv.style.visibility = "hidden";
            secdiv.style.visibility = "hidden";
            mindiv.style.visibility = "hidden";
            if(index == 8)
            {
                mode = false;
            }
        }
        else
        {
            document.getElementById("faceClock").click();
        }
    }

    function readURL(input) {
        if (input.files && input.files[0]) {
            var div = document.getElementsByClassName("watchBody")[0];
            var reader = new FileReader();
            
            reader.onload = function(e) {
                div.style.backgroundImage = "url("+e.target.result+")";
                div.style.backgroundSize = "100% 100%";
            }
            
            reader.readAsDataURL(input.files[0]); // convert to base64 string
        }
    }
