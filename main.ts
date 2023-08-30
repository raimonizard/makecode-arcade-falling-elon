namespace SpriteKind {
    export const background = SpriteKind.create()
}

sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player, function on_on_overlap(sprite: Sprite, otherSprite: Sprite) {
    catcher.startEffect(effects.confetti, 500)
    sprite.sayText(":)")
    sprites.destroy(sprite, effects.disintegrate, 200)
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

sprites.onDestroyed(SpriteKind.Projectile, function on_on_destroyed(sprite2: Sprite) {
    info.setScore(info.score() + 100)
})
controller.left.onEvent(ControllerButtonEvent.Repeated, function on_left_repeated() {
    catcher.x += -10
})
let twitter_logo : Sprite = null
let catcher : Sprite = null
info.setScore(0)
scene.setBackgroundImage(assets.image`
    ElonMidSize
`)
game.setDialogTextColor(8)
game.showLongText("Catch all the tweets before they fall!", DialogLayout.Top)
catcher = sprites.create(assets.image`
    catcher
`, SpriteKind.Player)
catcher.setPosition(80, 110)
catcher.setStayInScreen(true)
let index = 0
while (index <= randint(15, 35)) {
    throwTweet()
    pause(randint(400, 1500))
    index += 1
}
pause(2000)
game.setGameOverScoringType(game.ScoringType.HighScore)
game.gameOver(true)
game.setGameOverEffect(true, effects.confetti)
