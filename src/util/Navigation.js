export const level1Name = "GuessFlagScreen";
export const bonusLevel1Name = "BonusLevelScreen";
export const level2Name = "GuessCapitalScreen";
export const level3Name = "GuessShapeScreen";
export const level4Name = "GuessCountryLocationScreen";

export function navigateToLevel1(navigation) {
    navigation.navigate(level1Name)
}

export function navigateToBonusLevel1(navigation) {
    navigation.navigate(bonusLevel1Name)
}

export function navigateToLevel2(navigation) {
    navigation.navigate(level2Name)
}

export function navigateToLevel3(navigation) {
    navigation.navigate(level3Name)
}

export function navigateToLevel4(navigation) {
    navigation.navigate(level4Name)
}
