@script ExecuteInEditMode()

var guiCamera :Camera;

enum BorderType { Left, Right, Up, Down };

var borderType :BorderType;

var offset :Vector2 = Vector2.zero;

function Update ()
{
	var currentPixelHeight :int = guiCamera.pixelHeight;
	var currentPixelWidth :int = guiCamera.pixelWidth;
	
	
	switch (borderType)
	{
		case BorderType.Left:
		transform.position.x = (currentPixelWidth / 2) * -1;
		break;
		
		case BorderType.Right:
		transform.position.x = (currentPixelWidth / 2);
		break;
		
		case BorderType.Up:
		transform.position.y = (currentPixelHeight / 2);
		break;
		
		case BorderType.Down:
		transform.position.y = (currentPixelHeight / 2) * -1;
		break;
	}
	
	transform.position.y += offset.y;
	transform.position.x += offset.x;
}