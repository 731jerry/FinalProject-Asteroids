@script ExecuteInEditMode()

var radarTexture :Texture;
var playerTexture :Texture;
var enemyTexture :Texture;
var powerupTexture: Texture;

var mapSize :float;
var mapCenter :Vector2;
var worldSize :float;

var a: float;
var b:float;
var playerPosition :Transform;
var powerUpPosition :Transform;

static var lookForPowerUp :boolean = false;

function Start()
{
	a = Screen.width;
	b = Screen.height;
	//mapSize = Screen.width * 15 / 100.0;
	mapSize =90.9;
	mapCenter = Vector2(mapSize/2, Screen.height - mapSize/2);
	
	var asteroidField :AsteroidField = Camera.main.GetComponent(AsteroidField);
	
	worldSize = asteroidField.worldSize;
}

function OnGUI ()
{
	if(playerPosition == null)
	{
		var go = GameObject.FindObjectOfType(Ship);
		if(go != null)
		{
			playerPosition = go.transform;
		}
		
		else
		{
			return;
		}
	}
	
	if(powerUpPosition != null && lookForPowerUp)
	{
		var powerUp = GameObject.FindObjectOfType(typeof(PowerUp));
		if(powerUp != null)
		{
			powerUpPosition = powerUp.transform;
		}
	}
	
	GUI.DrawTexture(Rect(mapCenter.x - mapSize/2, mapCenter.y - mapSize/2, mapSize, mapSize), radarTexture);
	
	DrawPlayer();
	DrawEnemies();
	DrawPowerUp();
}

function DrawPlayer()
{
	DrawBlip(playerPosition.position, playerTexture, 8);
}

function DrawPowerUp()
{
	if(powerUpPosition != null){
	DrawBlip(powerUpPosition.position, powerupTexture, 8);
	}

}

function DrawEnemies()
{
	var gos :GameObject[];
	
	gos = GameObject.FindGameObjectsWithTag("Enemy");
	
	for(var go :GameObject in gos)
	{
		DrawBlip(go.transform.position, enemyTexture, 3);
	}
}

function DrawBlip(pos :Vector3, tex :Texture, size :int)
{
	var worldXPos = pos.x / worldSize;
	var worldZPos = pos.z / worldSize;
	
	worldZPos = -worldZPos;
	
	if(worldXPos > -0.5 && worldXPos < 0.5)
	{
		if(worldZPos > -0.5 && worldZPos < 0.5)
		{
			worldXPos *= mapSize * .9;
			worldZPos *= mapSize * .72;
			
			GUI.DrawTexture(Rect(mapCenter.x + worldXPos, mapCenter.y + worldZPos, size, size), tex);
		}
	}
	
}
