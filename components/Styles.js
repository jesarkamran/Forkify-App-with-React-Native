import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  dashboard: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#f7dea9',
    backgroundColor: '#fcf6e8',
  },
  listView: {
    flex: 1,
    backgroundColor: '#f5e8c9',
  },
  textTitle: {
    margin: 10,
    marginTop: 45,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25,
  },
  textDescription: {
    width: 200,
    textAlign: 'center',
    color: '#3d2f2f',
    fontWeight: 'bold',
    fontSize: 15,
  },
  viewMargin: {
    marginTop: 45,
  },
  btn: {
    margin: 10,
    padding: 10,
    width: 300,
    alignItems: 'center',
    backgroundColor: '#F69E84',
    borderRadius: 25,
  },
  loginBtnView: {
    marginTop: 10,
  },
  textbtn: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  img: {
    width: 300,
    height: 100,
  },
  inputs: {
    margin: 10,
    padding: 10,
    width: 300,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#FACB88',
    borderRadius: 25,
  },
  msgView: {
    flexDirection: 'row',
    marginTop: 40,
  },
  msgText: {
    fontWeight: 'bold',
    marginRight: 4,
  },
  msgBtnText: {
    fontWeight: 'bold',
    color: '#FF9A61',
  },
  customBar: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7cf98',
  },
  barImg: {
    marginLeft: 10,
    width: 150,
    height: 70,
  },
  barBtnView: {
    marginLeft: 65,
    flexDirection: 'row',
  },
  iconBtn: {
    margin: 5,
  },
  customIcon: {
    fontSize: 30,
    color: '#312222',
    fontWeight: 'bold',
  },
  item: {
    margin: 10,
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#ffe1b6',
  },
  itemBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  listTitle: {
    fontSize: 20,
    color: '#422424',
    fontWeight: 'bold',
    marginLeft: 14,
  },
  listImg: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderColor: 'black',
    borderWidth: 1,
  },
  title: {
    marginTop: 5,
    fontWeight: 'bold',
    color: '#7B1B0D',
  },
  copyrightView: {
    margin: 10,
    marginBottom: 30,
    padding: 20,
    paddingTop: 35,
    backgroundColor: '#f7cf98',
    borderRadius: 5,
  },
  copyrightText: {
    textAlign: 'center',
    color: '#7B1B0D',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // Search Screen styling
  searchView: {
    height: 620,
  },
  searchBar: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcf6e8',
  },
  searchInput: {
    margin: 10,
    marginLeft: 0,
    padding: 10,
    color: 'black',
    width: 280,
    height: 45,
    fontWeight: 'bold',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#FACB88',
  },
  searchBtnView: {
    padding: 2,
    borderRadius: 5,
    backgroundColor: '#F69E84',
  },
  searchResultView: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fcf6e8',
  },
  searchText: {
    margin: 5,
    fontWeight: 'bold',
    color: '#7B1B0D',
  },
  searchItem: {
    margin: 10,
    height: 80,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#ffe1b6',
  },
  searchItemBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
  },
  searchItemImg: {
    margin: 10,
    marginLeft: 15,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  searchItemTitle: {
    marginLeft: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7B1B0D',
  },
  searchItemUploader: {
    marginLeft: 20,
    fontWeight: 'bold',
    color: '#7e7676',
  },
  searchPagination: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pageBtn: {
    margin: 10,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#F69E84',
    borderRadius: 25,
  },
  pageBtnTxt: {
    fontWeight: 'bold',
    color: '#fff',
  },
  pageBtnIcon: {
    fontSize: 17,
    color: '#fff',
  },
  // Recipe Screen Styling
  recipeView: {
    flex: 1,
  },
  imgView: {
    width: '100%',
    opacity: 0.9,
  },
  recipeImg: {
    width: 395,
    height: 270,
    justifyContent: 'flex-end',
  },
  recipeTitleView: {
    alignSelf: 'flex-start',
  },
  recipeTitle: {
    margin: 20,
    marginBottom: 2,
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 25,
    fontWeight: '700',
    textTransform: 'uppercase',
    fontFamily: 'serif',
    color: '#0a0a0a', // Changed to white for better contrast
    backgroundColor: '#f8b558',
    borderRadius: 10, // Rounded corners
    overflow: 'hidden', // Ensures the background respects the border radius

    // Text shadow for a more pronounced effect (optional)
    textShadowColor: 'rgba(252, 248, 248, 0.75)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 10,
  },
  recipeBtnBar: {
    marginTop: 10,
    flexDirection: 'row',
    padding: 15,
    paddingLeft: 0,
  },
  recipeBtn: {
    margin: 5,
  },
  recipeBtnTxt: {
    fontSize: 25,
    color: '#f8b558',
  },
  btnView: {
    marginLeft: 15,
    flexDirection: 'row',
  },
  btnText: {
    paddingTop: 10,
    fontWeight: 'bold',
  },
  bookmarkBtnView: {
    marginTop: 190,
    marginLeft: 275,
    position: 'absolute',
    top: 50, // Adjust these values as needed
    left: 50,
    zIndex: 2,
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f8b558',
    borderRadius: 35,
  },
  backButton: {
    position: 'absolute',
    top: 5, // Adjust these values as needed
    left: 2,
    zIndex: 2,
    alignSelf: 'flex-start',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  bookmarkBtnTxt: {
    fontSize: 29,
    color: '#fff',
  },
  ingredientsView: {
    backgroundColor: '#dbd7d7',
  },
  IngredientsText: {
    marginLeft: 5,
    textAlign: 'justify',
    fontWeight: '600',
    fontFamily: 'poppins',
  },
  tickIcon: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '700',
    color: '#FF9A61',
    fontFamily: 'poppins',
  },
  ingredientsList: {
    marginTop: 10,
    marginLeft: 25,
    marginBottom: 5,
    width: 280,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  ingredientsListTitle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#FF9A61',
    fontFamily: 'poppins',
  },
  footer: {
    alignItems: 'center',
  },
  desText: {
    textAlign: 'center',
    width: 350,
    fontFamily: 'poppins',
    fontSize: 15,
  },
  dirBtn: {
    marginVertical: 10,
    marginHorizontal: 0,
    padding: 10,
    paddingRight: 0,
    width: 120,
    backgroundColor: '#F69E84',
    borderRadius: 25,
  },
  dirBtnTxt: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },

  //  Add New Recipe Screen
  addScroll: {
    flex: 1,
    padding: 10,
    marginBottomBottom: 20,
    backgroundColor: '#fcf6e8',
  },
  inputViews: {
    margin: 10,
  },
  addInputs: {
    margin: 4,
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 20,
    fontSize: 17,
    fontFamily: 'poppins',
  },
  uploadBtn: {
    flexDirection: 'row',
    margin: 20,
    marginLeft: 130,
    marginBottom: 50,
    padding: 10,
    width: 120,
    borderRadius: 15,
    backgroundColor: '#F69E84',
  },
  uploadBtnTxt: {
    fontSize: 17,
    fontFamily: 'poppins',
    fontWeight: '700',
    color: 'white',
  },
  uploadBtnTxtIcon: {
    fontSize: 25,
    marginRight: 5,
    color: 'white',
  },
  // Profile View
  profileView: {
    flex: 1,
    backgroundColor: '#fcf6e8',
  },
  circularName: {
    marginTop: 40,
    marginLeft: 120,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
    borderRadius: 80,
    backgroundColor: '#B13267',
  },
  circularNameTxt: {
    fontSize: 80,
    color: '#fcf6e8',
  },
  username: {
    margin: 20,
    marginLeft: 110,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7B1B0D',
  },
  statsView: {
    marginVertical: 10,
    marginHorizontal: 30,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#7B1B0D',
    borderRadius: 4,
  },
  statsTxt: {
    marginHorizontal: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7B1B0D',
  },
  statsNum: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginHorizontal: 5,
  },
  hr: {
    margin: 10,
    borderBottomColor: '#B13267',
    borderBottomWidth: 2,
  },
  profileFooter: {
    margin: 30,
    textAlign: 'center',
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default styles;
