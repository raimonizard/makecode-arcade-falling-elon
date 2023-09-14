namespace SpriteKind {
    export const background = SpriteKind.create()
}

sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player, function on_on_overlap(sprite: Sprite, otherSprite: Sprite) {
    catcher.startEffect(effects.confetti, 250)
    sprite.sayText(":)", 200)
    sprites.destroy(sprite, effects.disintegrate, 50)
    music.play(music.melodyPlayable(music.magicWand), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function on_on_overlap_enemy(sprite: Sprite, otherSprite: Sprite) {
    catcher.startEffect(effects.fire, 250)
    sprites.destroy(sprite, effects.halo, 50)
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.UntilDone)
})
controller.right.onEvent(ControllerButtonEvent.Repeated, function on_right_repeated() {
    catcher.x += 10
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function on_left_pressed() {
    catcher.x += -10
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function on_right_pressed() {
    catcher.x += 10
})
function throwTweet() {
    
    if (randint(0, 1) == 0) {
        twitter_logo = sprites.create(assets.image`
                twitterLogoR
            `, SpriteKind.Projectile)
    } else {
        twitter_logo = sprites.create(assets.image`
                twitterLogoL
            `, SpriteKind.Projectile)
    }
    
    twitter_logo.setStayInScreen(false)
    twitter_logo.setBounceOnWall(false)
    twitter_logo.setPosition(randint(5, 155), 0)
    twitter_logo.setVelocity(randint(-4, 4), randint(10, 60))
}

function throwX() {
    
    x_logo.setStayInScreen(true)
    x_logo.setBounceOnWall(true)
    x_logo.setPosition(randint(5, 155), 0)
    x_logo.setVelocity(randint(-4, 4), randint(10, 60))
}

sprites.onDestroyed(SpriteKind.Projectile, function on_on_destroyed(sprite2: Sprite) {
    info.setScore(info.score() + 100)
})
controller.left.onEvent(ControllerButtonEvent.Repeated, function on_left_repeated() {
    catcher.x += -10
})
function start() {
    music.setVolume(50)
    info.setScore(0)
    scene.setBackgroundImage(assets.image`
        ElonMidSize
    `)
    game.setDialogTextColor(8)
    game.showLongText("Catch all the tweets before they fall!", DialogLayout.Top)
    catcher.setPosition(80, 110)
    catcher.setStayInScreen(true)
    let index = 0
    while (index <= randint(15, 45)) {
        if (randint(0, 1) == 0) {
            throwTweet()
        } else {
            throwX()
        }
        
        pause(randint(400, 1500))
        index += 1
    }
    pause(2000)
    game.setGameOverScoringType(game.ScoringType.HighScore)
    game.gameOver(true)
    game.setGameOverEffect(true, effects.confetti)
}

let twitter_logo : Sprite = null
let x_logo : Sprite = null
x_logo = sprites.create(assets.image`
        xLogo
    `, SpriteKind.Enemy)
let catcher : Sprite = null
catcher = sprites.create(assets.image`
        catcher
    `, SpriteKind.Player)
start()
