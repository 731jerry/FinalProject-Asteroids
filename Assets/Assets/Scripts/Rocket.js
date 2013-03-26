static var Speed : float = 12.0;

private var searchRadius : float = 45.0;
private var enemySearchedLocation : GameObject = null;
private var turnDamping = 0.1;

function Start()
{
	//This is an interesting one
	//We can use the check sphere function to find an asteroid
	var colliders : Collider[] = Physics.OverlapSphere (transform.position, searchRadius);
	for(var theCollider : Collider in colliders)
	{
		if(theCollider.tag == "Enemy")
		{
			//Located an enemy
			enemySearchedLocation = theCollider.gameObject;			
			break;
		}
	}
	
	Invoke("Kill", 8.0); //kill ourselves after 8 seconds, we havent hit anything...
}

function Update()
{
	if(enemySearchedLocation)
	{
		var toEnemy = (enemySearchedLocation.transform.position - transform.position);
		toEnemy.Normalize();
		
		transform.forward = Vector3.Lerp(transform.forward,toEnemy,turnDamping);
		
		rigidbody.velocity = transform.forward * Speed;
		
		transform.LookAt(transform.position + transform.forward);
	}
	else
	{
		rigidbody.velocity = transform.forward * Speed;		
		transform.LookAt(transform.position + transform.forward);
	}
}

function OnTriggerEnter(other : Collider)
{
	var ast : Asteroid = other.transform.GetComponent(Asteroid);
	if(ast != null) //weve hit an asteroid!
	{
		//Tell the asteroid its been hit by a missile
		ast.MissileHit();
		
		//Kill ourselves
		Kill();
	}
}

function Kill()
{
	// Stop emitting particles in any children
	var emitter : ParticleEmitter= GetComponentInChildren(ParticleEmitter);
	if (emitter)
		emitter.emit = false;

	// Detach children - We do this to detach the trail rendererer which should be set up to auto destruct
	transform.DetachChildren();
	
	Destroy(this.gameObject);
}

