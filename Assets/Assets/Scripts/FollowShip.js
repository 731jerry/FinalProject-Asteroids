var follow :Ship;


function LateUpdate () {

var cam = GetComponent("Camera");
if (cam!=null){
	if (follow){
	
		cam.transform.position = Vector3(follow.transform.position.x, cam.transform.position.y, follow.transform.position.z);
	}
	else
	{
			follow = GameObject.FindObjectOfType(Ship);
	}

}
}