var edgeHeight :int = 50;
var edgeDepth :int = 5;
var worldSize :float = 128.0;

var up :GameObject;
var down :GameObject;
var left :GameObject;
var right :GameObject;

function Start () {
	var centerX = transform.position.x + (worldSize * .5);
	var centerZ = transform.position.z + (worldSize *.5);
	
	left.transform.position = Vector3(transform.position.x - edgeDepth * .5, 0, centerZ);
	right.transform.position = Vector3(transform.position.x + worldSize + edgeDepth * .5, 0, centerZ);
	
	up.transform.position = Vector3(centerX, 0, transform.position.z - edgeDepth * .5);
	down.transform.position = Vector3(centerX, 0, transform.position.z + worldSize + edgeDepth * .5);
	
	left.transform.localScale = Vector3(edgeDepth, edgeHeight, worldSize);
	right.transform.localScale = Vector3(edgeDepth, edgeHeight, worldSize);
	
	up.transform.localScale = Vector3(worldSize, edgeHeight, edgeDepth);
	down.transform.localScale = Vector3(worldSize, edgeHeight, edgeDepth);
	
	transform.position = Vector3(-(worldSize * .5), 0, -(worldSize * .5));
}