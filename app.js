const { exec } = require('child_process')
const yt = require('scrape-youtube').default
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

var list = []
var format = 0
rl.question("Search for videos: ", input => {
  yt.search(input).then(res => {
    list = res.videos
    for(var i = 0; i < 10; ++i){
      console.log(i + '. ' + list[i].title + ' (' + (list[i].duration/60).toFixed(2) + 'min)')
    }
    rl.question("Enter video number: ", num => {
      exec('youtube-dl -f \'bestvideo[ext=mp4]+bestaudio[ext=m4a]/bestvideo+bestaudio\' --merge-output-format mp4 -- ' + list[num].link, (error, stdout, stderr) => {
	if(error) {
	  console.error(`exec error: ${error}`)
	  return
	}
	console.log('Video downloaded')
	rl.close()
      })
    })
  })
})

rl.on('close', () => process.exit(0))
