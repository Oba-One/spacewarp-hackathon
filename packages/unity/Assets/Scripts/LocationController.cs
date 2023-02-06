using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class LocationController : MonoBehaviour
{
    [SerializeField]
    private Transform[] zones;
    public int lastZoneFilled = 0;

    [SerializeField]
    private Transform[] opponentZones;
    public int lastOpponentZoneFilled = 0;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public Transform GetZone(int i)
    {
        return zones[i];
    }

    public int GetNextZone()
    {
        if (lastZoneFilled >= 4)
        {
            return -1;
        }
        else
        {
            return lastZoneFilled + 1;    
        }
    }

    public Transform GetOpponentZone(int i)
    {
        return opponentZones[i];
    }

    public int GetNextOpponentZone()
    {
        if (lastOpponentZoneFilled >= 4)
        {
            return -1;
        }
        else
        {
            return lastOpponentZoneFilled + 1;    
        }
    }
}
