
function Awake()
{
	Radar.lookForPowerUp = true;
}


function OnTriggerEnter (other :Collider)
{
	if(other.tag == "Player")
	{
		var theShip :Ship = other.GetComponent(Ship);
		theShip.Upgrade();
		Radar.lookForPowerUp = false;
		Destroy(this.gameObject);
		
	}
}