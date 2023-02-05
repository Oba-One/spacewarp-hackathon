using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class GameManager : MonoBehaviour
{
    [SerializeField]
    private GameObject cardPrefab;

    [SerializeField]
    private Canvas canvas;

    // deck
    private List<CardManager> deck;
    private List<CardManager> hand;
    private List<CardManager> field;
    [SerializeField]
    private Transform[] handSlots;
    private Transform[] fieldSlots;

    [SerializeField]
    private Text account;

    void Awake()
    {
        deck = new List<CardManager>();
        hand = new List<CardManager>();
        field = new List<CardManager>();
    }

    // Start is called before the first frame update
    void Start()
    {
        CreateGame();
    }

    // Update is called once per frame
    void Update()
    {
        account.text = PlayerPrefs.GetString("Account");
    }

    void MoveCardFromDeck2Hand()
    {

    }

    void MoveCardFromHand2Field()
    {
    }

    // Get game state from MUD
    void FetchGameState()
    {

    }

    void CreateGame()
    {
        Debug.Log("CreateGame");
        string ipfsHost = "https://gateway.lighthouse.storage/ipfs";
        List<string> imageCids = new List<string>{
            // chavez
            "QmerXkUqbixUfy47YHusPBVTd2CPDBgpmHVtxiyC9n31NN",
            // antman
            "QmW7q4QxyYC6mFZniU7SqXPivSsijNCt6kWDQWxiWpyDK3",
            // apocalypse
            "Qme9uezkeVaRZ8Qo2N16duFCsmGZjXiXt2tkPH6KZUV3n7",
            // blackbolt
            "QmZRTKS5iBULdk3u1Sm69MVyEaPe1evcnUFfWaYj4cA7av",
            // captain marvel
            "QmYc7CYd2wpiY69PdzWrsZjrUum69GDvzt24YpRFUmhr8U",
            // thanos
            "QmVRKmufiSDogoQh6c1heFbCvUTSgu6xctycTb5jyoCcm1",
            // prof x
            "QmNe4AbGkyyaoKjLdE6jpiyuMjisiPeGAQ2NA7TigW1p5E"


        };
        // create new card from prefab for each image and place in deck

        int handSlotIndex = 0;
        foreach (var imageCid in imageCids)
        {
            Debug.Log("Creating card " + handSlotIndex);
            Vector3 cardPosition = handSlots[handSlotIndex++].position;
            GameObject card = Instantiate(cardPrefab, cardPosition, Quaternion.identity);
            card.transform.SetParent(canvas.transform, false);
            CardManager cardManager = card.GetComponent<CardManager>();
            // card.transform.localScale = cardPosition;
            card.transform.position = cardPosition;
            
            Debug.Log(cardManager);
            
            string cardUri = ipfsHost + "/" + imageCid;
            cardManager.SetImage(cardUri);
            Debug.Log("Created card " + handSlotIndex);
        }
    }

    void JoinGame()
    {

    }

    void FinishTurn()
    {

    }
}
