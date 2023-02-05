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
}
