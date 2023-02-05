using UnityEngine;
using UnityEngine.SceneManagement;

public class TeamSceneController : MonoBehaviour
{
   public void SetTeam(int team)
   {
        Debug.Log("SetTeam " + team);
        PlayerData.team = team;
        SceneManager.LoadScene("1 - connect");
   }

   public void Skip()
   {
      SetTeam(1);
   }

   public void Update()
   {
      if (Input.GetMouseButtonDown(0)) {  
         Ray ray1 = Camera.main.ScreenPointToRay(Input.mousePosition);  
         RaycastHit hit;
         Debug.Log("GetMouseButtonDown");
         if (Physics.Raycast(ray1, out hit)) { 
            Debug.Log("situation1");
            Debug.Log(hit.transform.name);
         }  


         Ray ray2 = Camera.main.ViewportPointToRay(Input.mousePosition);  
         RaycastHit hit2;
         Debug.Log("GetMouseButtonDown");
         if (Physics.Raycast(ray2, out hit2)) { 
            Debug.Log("situation2");
            Debug.Log(hit2.transform.name);
         }  

         Ray ray3 = Camera.main.ScreenPointToRay(transform.position);  
         RaycastHit hit3;
         Debug.Log("GetMouseButtonDown");
         if (Physics.Raycast(ray3, out hit3)) { 
            Debug.Log("situation2");
            Debug.Log(hit3.transform.name);
         }  
      } 
   }
}
