//play
export const play = async (playbackObj, uri) => {
    try{
        await playbackObj.loadAsync(uri);
        return await playbackObj.playAsync();
    }catch(error){
        console.log('Error in play controller: ', error.message);
    }
}

//pause
export const pause = async (playbackObj) => {
    try{
        return await playbackObj.pauseAsync();
    }catch(error){
        console.log('Error in pause controller: ', error.message);
    }
}

//resume
export const resume = async (playbackObj) => {
    try{
        return await playbackObj.playAsync();
    }catch(error){
        console.log('Error in play(resume) controller: ', error.message);
    }
}

//next