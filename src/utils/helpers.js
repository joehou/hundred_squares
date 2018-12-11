let initialEvent=[
  {
    eventID:1,
    eventName: "Shower with dog",
    eventColor: "#42AB9E",
    eventFontColor: "white",
    startBlock: 0,
    endBlock:  5,
  },
  {
    eventID:2,
    eventName:"Breakfast",
    eventColor:"lightgray",
    eventFontColor: "white",
    startBlock:6,
    endBlock:12
  },
  {
    eventID:2,
    eventName:"Study Science",
    eventColor:"#FEF7C1",
    eventFontColor: "darkgray",
    startBlock:13,
    endBlock:17
  }
]

function createBlock (number){
  return {
    id: number,
    eventID: null,
    selected: false,
    row: Math.floor(number/10),
    col: number%10,

  }
}


export function getInitialBlocks(){
  const initialBlocks=[]
  
  let initialEvents=[
    {
      eventID:1,
      eventName: "Shower with dog",
      eventColor: "#42AB9E",
      eventFontColor: "white",
      startBlock: 0,
      endBlock:  5,
    },
    {
      eventID:2,
      eventName:"Breakfast",
      eventColor:"lightgray",
      eventFontColor: "white",
      startBlock:6,
      endBlock:12
    },
    {
      eventID:2,
      eventName:"Study Science",
      eventColor:"#FEF7C1",
      eventFontColor: "darkgray",
      startBlock:13,
      endBlock:17
    }
  ]
  for (var i = 0; i <= 100; i++) {
    initialBlocks.push(createBlock(i));
  }
  
  initialEvents =initialEvents.map(event =>{
      for (i= event.startBlock;i <= event.endBlock;i++ )
      {
        initialBlocks[i].eventID=event.eventID
      }
    }
  )
  return initialBlocks
}


export function getDummyEvents(){
  return [
  {
    eventID:1,
    eventName: "Shower with dog",
    eventColor: "#42AB9E",
    eventFontColor: "white",
    startBlock: 0,
    endBlock:  5,
  },
  {
    eventID:2,
    eventName:"Breakfast",
    eventColor:"lightgray",
    eventFontColor: "white",
    startBlock:6,
    endBlock:12
  },
  {
    eventID:2,
    eventName:"Study Science",
    eventColor:"#FEF7C1",
    eventFontColor: "darkgray",
    startBlock:13,
    endBlock:17
  }
]
}
