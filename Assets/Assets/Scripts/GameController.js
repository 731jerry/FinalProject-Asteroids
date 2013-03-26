var gameLevel = 0;
var gameEnemies = 0;
var gameLives = 3;
var gameScore = 0;

static var instance :GameController;

var shipPrefab :Ship;

function Awake()
{
	instance = FindObjectOfType(GameController);
	if(instance == null)
	{
		Debug.Log("Could not locate the Game Controller");
	}
	
}

function TimedGameRestart (timer :float, position :Vector3)
{
	yield WaitForSeconds(timer);
	var newShip :Ship = Instantiate(shipPrefab);
	newShip.transform.position = position;
	
}

function Update()
{
	if(gameEnemies <= 0)
	{
		GameController.instance.gameLevel++;
		NewLevel();
	}
	
	if(gameLives <= 0)
	{
		GameOver();
	}
}

function NewLevel()
{
	var astField :AsteroidField = Camera.main.GetComponent(AsteroidField);
	astField.GenerateLevel();
}

function GameOver()
{
	yield WaitForSeconds(3.0);
	AddScore();
	Application.LoadLevel("main menu");
}

function AddScore()
{
	HighScores.instance.AddScore(PlayerPrefs.GetString("PlayerName"), gameScore);
}