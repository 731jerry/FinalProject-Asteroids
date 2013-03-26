
var beamVelocity = 100;

var miniExplosion :GameObject;
var miniExplosionSound :AudioClip;

function Go (shipVelocity :Vector3)
{
	rigidbody.AddForce(transform.forward + shipVelocity, ForceMode.VelocityChange);
	yield WaitForSeconds(5);
	Destroy(this.gameObject);
}

function FixedUpdate()
{
	rigidbody.AddForce(transform.forward * beamVelocity, ForceMode.Acceleration);
	//transform.eulerAngles = Vector3(transform.eulerAngles.x, 0, transform.eulerAngles.z);
}

function OnTriggerEnter(other :Collider)
{
	var ast :Asteroid = other.transform.GetComponent(Asteroid);
	if(ast != null)
	{
		ast.Hit();
		var go = Instantiate(miniExplosion, transform.position, transform.rotation);
		var det = go.GetComponent("Detonator");
		det.size = 1;
		
		AudioSource.PlayClipAtPoint(miniExplosionSound, transform.position, .5);
		
		
		Destroy(this.gameObject);
		
	}
}