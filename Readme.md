this is a hacky modloader thing for the twine Interactive Fiction Engine

it allows you to download and install additional twee code into the twine story you are currently playing.

to load the current version of it
```
javascript:(function()%7Bfunction callback()%7Bmain.main()%7Dvar s%3Ddocument.createElement("script")%3Bs.src%3D"https%3A%2F%2Fabc03c76ca6e00838ba5d0aad43921446853c64e.googledrive.com%2Fhost%2F0B4YPWGzx_WjeTXhCWWhFd3dWdEk%2Fmagic.js"%3Bif(s.addEventListener)%7Bs.addEventListener("load"%2Ccallback%2Cfalse)%7Delse if(s.readyState)%7Bs.onreadystatechange%3Dcallback%7Ddocument.body.appendChild(s)%3B%7D)()
```
add the thing above as a bookmarklet and run it when you open a twine story

Functions:

Download and parse a twee code file into the downloadedmods array

```
window.DownloadMod("insert twee url here");
```
Import the mod into the story and start the story back from the begining
```
window.ImportMod();
```
