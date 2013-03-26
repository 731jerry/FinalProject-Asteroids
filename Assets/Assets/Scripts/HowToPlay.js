@script ExecuteInEditMode()

//var guiSkin :GUISkin;

function OnGUI ()
{
GUI.Label(Rect(20, 140, 250, 20), "key w to forward");
GUI.Label(Rect(20, 160, 250, 20), "key s to backward");
GUI.Label(Rect(20, 180, 250, 20), "key a to turn left");
GUI.Label(Rect(20, 200, 250, 20), "key s to turn right");
GUI.Label(Rect(20, 240, 250, 20), "key space to shoot");
GUI.Label(Rect(20, 260, 250, 20), "also can use right mouse to shoot");
GUI.Label(Rect(20, 280, 250, 20), "left mouse to aim");
}