let initialEvents=[
  {
    eventID:1,
    eventName: "Shower with doggie",
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
    eventID:3,
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

// loops through events...and delete gaps?
export const closeGaps = (eventsArray)=>{
    var gapSize= eventsArray[0].startBlock
    return eventsArray.map( (event, i, arr) => {
        if ( gapSize ===0 &&  i>0 && ( (event.startBlock-arr[i-1].endBlock) >= 1 )  ) gapSize=(event.startBlock-arr[i-1].endBlock) - 1
        if (gapSize>0) event= {...event, startBlock: event.startBlock -= gapSize ,endBlock: event.endBlock -= gapSize}
        return event
    })
}

export function getBlocks(events){
  const initialBlocks=[]
  for (var i = 0; i <= 100; i++) {
    initialBlocks.push(createBlock(i));
  }

  events.map(event =>{
      for (i= event.startBlock;i <= event.endBlock;i++ )
      {
        initialBlocks[i].eventID=event._id
      }
    }
  )
  return initialBlocks
}

export function getInitialBlocks(){
  const initialBlocks=[]

  for (var i = 0; i <= 100; i++) {
    initialBlocks.push(createBlock(i));
  }

  initialEvents.map(event =>{
      for (i= event.startBlock;i <= event.endBlock;i++ )
      {
        initialBlocks[i].eventID=event.eventID
      }
    }
  )
  return initialBlocks
}


export function getDummyGrid(){
  return {
  gridName: "My Day",
  gridTitle: "my title",
  events:[
  {
    eventID:1,
    _id:1,
    eventName: "Shower with dog",
    eventColor: "#42AB9E",
    eventFontColor: "white",
    startBlock: 0,
    endBlock:  5,
  },
  {
    eventID:2,
    _id:2,
    eventName:"Breakfast",
    eventColor:"lightgray",
    eventFontColor: "white",
    startBlock:6,
    endBlock:12
  },
  {
    eventID:3,
    _id:3,
    eventName:"Study Science",
    eventColor:"#FEF7C1",
    eventFontColor: "darkgray",
    startBlock:13,
    endBlock:17
  }
  ]
}
}
