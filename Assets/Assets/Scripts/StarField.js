var starPrefab :GameObject;
var fieldSize :float;
var starCount :int;

function Start ()
{
	for(var i = 0; i < starCount; i++)
	{
		var halfFieldSize = fieldSize * .5;
		
		var xPos = Mathf.Lerp(-halfFieldSize, halfFieldSize, Random.value);
		var yPos = Mathf.Lerp(-halfFieldSize, halfFieldSize, Random.value);
		var zPos = Mathf.Lerp(-halfFieldSize, halfFieldSize, Random.value);
		
		Instantiate(starPrefab, Vector3(xPos, yPos, zPos), transform.rotation);
		
	}
}