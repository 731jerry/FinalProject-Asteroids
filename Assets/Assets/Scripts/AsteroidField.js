var asteroidPrefab :Asteroid;
var worldSize :float;
var maxAsteroidSize :int;
var minAsteroidSize :int;
var asteroidCount :int;
var powerUpPrefab :PowerUp;

function GenerateLevel()
{
	var spawnedAsteroids = 0;
	asteroidCount = 5 + (GameController.instance.gameLevel * 5);
	
	while(spawnedAsteroids < asteroidCount)
	{
		var halfWorldSize = worldSize * .5;
		
		var rand = Random.Range(maxAsteroidSize, minAsteroidSize);
		var velocityScale = GameController.instance.gameLevel * 1.25;
		
		var xPos = Mathf.Lerp(-halfWorldSize, halfWorldSize, Random.value);
		var zPos = Mathf.Lerp(-halfWorldSize, halfWorldSize, Random.value);
		
		var rdr :Renderer = asteroidPrefab.GetComponent(Renderer);
		var radius :float = ((rdr.bounds.max - rdr.bounds.min).magnitude * rand) * .5;
		
		if(!Physics.CheckSphere(Vector3(xPos, 0.0, zPos), radius * 2))
		{
			var newAsteroid :Asteroid = Instantiate(asteroidPrefab);
			newAsteroid.transform.position = Vector3(xPos, 0, zPos);
			
			newAsteroid.Setup(rand, velocityScale);
			spawnedAsteroids++;
			
		}
	}
	SpawnPowerUp();
}

function SpawnPowerUp()
{
	var halfWorldSize;
	var xPos;
	var yPos;
	var zPos;
	var rand;
	var spawnedPowerUp :boolean = false;
	var loopCount = 0;
	var breakoutSafetyNumber = 10000;
	
	while(!spawnedPowerUp)
	{
		halfWorldSize = worldSize * .5;
		
		xPos = Mathf.Lerp(-halfWorldSize, halfWorldSize, Random.value);
		zPos = Mathf.Lerp(-halfWorldSize, halfWorldSize, Random.value);
		var rdr :Renderer = powerUpPrefab.GetComponent(Renderer);
		var radius :float = ((rdr.bounds.max - rdr.bounds.min).magnitude) * .5;
		
		if(!Physics.CheckSphere(Vector3(xPos, 0.0, zPos), radius * 2))
		{
			var newPowerUp :PowerUp = Instantiate(powerUpPrefab);
			
			newPowerUp.transform.position = Vector3(xPos, 0.0, zPos);
			
			spawnedPowerUp = true;
		}
		
		loopCount++;
		if(loopCount > breakoutSafetyNumber)
		{
			break;
		}
	}
}