var scoreTickTime = .05;
var scoreObject :GameObject;
var enemiesObject :GameObject;
var livesArray :GameObject[];

private var prevTick = 0.0;
var tickClip :AudioClip;


function Update ()
{
	UpdateLives(GameController.instance.gameLives);
	UpdateEnemies(GameController.instance.gameEnemies);
	
	var thisTick = Time.time;
	
	if((thisTick - prevTick) > scoreTickTime)
	{
		var guiScore = CheckGUIScore();
		
		if(guiScore < GameController.instance.gameScore)
		{
			AddGUIScore();
		}
		
		prevTick = thisTick;
		
	}
	
}

function UpdateLives(nLives :int)
{
	for(var i = 0; i < (livesArray.length - nLives); i++)
	{
		livesArray[i].renderer.enabled = false;
	}
}

function UpdateEnemies(nEnemies :int)
{
	var textMesh :TextMesh = enemiesObject.GetComponent(TextMesh);
	textMesh.text = nEnemies.ToString();
}

function CheckGUIScore() :int
{
	if(scoreObject)
	{
		var textMesh :TextMesh = scoreObject.GetComponent(TextMesh);
		return parseInt(textMesh.text);
	}
}

function AddGUIScore()
{
	if(scoreObject)
	{
		var textMesh :TextMesh = scoreObject.GetComponent(TextMesh);
		var score :int = parseInt(textMesh.text);
		score++;
		textMesh.text = score.ToString();
	}
	
	AudioSource.PlayClipAtPoint(tickClip, Camera.main.transform.position, .25);
}