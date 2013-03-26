var keyTurnLeft :String;
var keyTurnRight :String;
var keyThrust :String;
var keyReverseThrust :String;
var keyFire :String;

var thrustTurnPower :float;
var thrustPower :float;

var boostersPrefab :GameObject;
var boostersPos :GameObject;

var beamPrefab :GameObject;

var missilePrefab :GameObject;

private var instanBoosters;
private var instanBoostersExists :boolean;

var asteroidExplosion :GameObject;
var asteroidExplosionSound :AudioClip;

var launchPos :GameObject;
var shootSound :AudioClip;
var missileSound :AudioClip;

var upgradeLevel :int = 0;
var prevFireTime :float = 0.0;
var rapidFireRate :float = 0.1;
var prevLaunchTime :float = 0.0;
var launchRate :float = .5;

function Update ()
{
	if(Input.GetKey(keyTurnLeft))
	{
		rigidbody.AddTorque(Vector3.up * -thrustTurnPower, ForceMode.Acceleration);
	}
	
	else if(Input.GetKey(keyTurnRight))
	{
		rigidbody.AddTorque(Vector3.up * thrustTurnPower, ForceMode.Acceleration);
	}
	
	else
	{
		rigidbody.angularVelocity = Vector3.zero;
	}
	
	if(Input.GetKey(keyThrust))
	{
		StartBoosters();
		rigidbody.AddForce(transform.forward * thrustPower, ForceMode.Acceleration);
	}
	
	else if(Input.GetKey(keyReverseThrust))
	{
		StartBoosters();
		rigidbody.AddForce(transform.forward * -thrustPower, ForceMode.Acceleration);
	}
	
	else
	{
		StopBoosters();
	}

	if (Input.GetMouseButtonDown(0)){		
		var world:Vector3;
		var screenpos=Camera.main.WorldToScreenPoint(transform.position);
		var e:Vector3=Input.mousePosition;
		e.z=screenpos.z;
		world.x=Camera.main.ScreenToWorldPoint(e).x;   
		world.z=Camera.main.ScreenToWorldPoint(e).z;   
		world.y=transform.position.y;  
		transform.LookAt(world);
		//transform.Translate(Vector3.forward*1*Time.deltaTime);  
	}
		
	switch(upgradeLevel)
	{
		case 0:
		if(Input.GetKeyDown(keyFire) || Input.GetMouseButtonDown(1))
		{
			Fire();
			//MissileFire();
			
		}
		
		break;
		
		case 1:
		if(Input.GetKey(keyFire)|| Input.GetMouseButtonDown(1))
		{
			RapidFire();
		}
		
		break;
		
		case 2:
		if(Input.GetKey(keyFire)|| Input.GetMouseButtonDown(1))
		{
			RapidFire();
			MissileFire();
		}
		break;
		
		case 3:
		if(Input.GetKey(keyFire)|| Input.GetMouseButtonDown(1))
		{
			RapidFire();
			MissileFire();
			Rocket.Speed = 25;
		}
		
		break;
		
	}
	
}

function StartBoosters()
{
	if(instanBoostersExists == false)
	{
		instanBoosters = Instantiate(boostersPrefab, boostersPos.transform.position, boostersPos.transform.rotation);
		instanBoosters.transform.parent = boostersPos.transform;
		instanBoostersExists = true;
	}
	
}

function Upgrade()
{
	upgradeLevel++;
	if(upgradeLevel > 3)
	{
		upgradeLevel = 3;
	}
}

function UpLives(){
	if (GameController.instance.gameLives > 0 && GameController.instance.gameLives<5 ){
		GameController.instance.gameLives++;
		print(GameController.instance.gameLives);
	}
	
	if (GameController.instance.gameLives == 5){
		GameController.instance.gameScore += 30;
	}

}

function StopBoosters()
{
	if(instanBoostersExists == true)
	{
		var emitter :ParticleEmitter = instanBoosters.GetComponent("ParticleEmitter");
		emitter.emit = false;
		Destroy(instanBoosters, 2);
		instanBoostersExists = false;
	}

}

function Fire()
{
	AudioSource.PlayClipAtPoint(shootSound, transform.position, .85);
	var beamObj :GameObject = Instantiate(beamPrefab, launchPos.transform.position, transform.rotation);
	var beam = beamObj.GetComponent("Beam");
	beam.Go(rigidbody.velocity);
}

function RapidFire()
{
	var currentTime = Time.time;
	if((currentTime - prevFireTime) > rapidFireRate)
	{
		Fire();
		prevFireTime = currentTime;
	}
}

function MissileFire()
{
	var currentTime = Time.time;
	if((currentTime - prevLaunchTime) > launchRate)
	{
		var missileObj :GameObject = Instantiate(missilePrefab, transform.position, transform.rotation);
		
		audio.PlayOneShot(missileSound);
		
		prevLaunchTime = currentTime;
	}
}

function OnCollisionEnter(collisionInfo :Collision)
{
	var ast = collisionInfo.transform.GetComponent("Asteroid");
	if(ast != null)
	{
		var go = Instantiate(asteroidExplosion, transform.position, transform.rotation);
		var det = go.GetComponent("Detonator");
		det.size = 22;
		
		AudioSource.PlayClipAtPoint(asteroidExplosionSound, transform.position, 1.0);
		
		Destroy(this.gameObject);
		Destroy(ast.gameObject);
		
		var gameController = Camera.main.GetComponent("GameController");
		gameController.TimedGameRestart(1, transform.position);
		GameController.instance.gameLives--;
		GameController.instance.gameEnemies--;
	}
}