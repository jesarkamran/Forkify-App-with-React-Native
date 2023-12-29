import React, {useState, useEffect} from 'react';
import {TextInput, View, StatusBar, Text} from 'react-native';
import styles from '../components/Styles';
import IconButton from '../components/IconButton';
import {
  controlSearchResults,
  gotPage,
} from '../API DATA Fetch Logic/controller';
import ResultList from '../components/SearchResultList';
import PrevButton from '../components/PrevButton';
import NextButton from '../components/NextButton';

const Search = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [searchMsg, setSearchMsg] = useState('');
  const [searchResult, setSearchResult] = useState({});
  const [show, setShow] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPages, setMaxPages] = useState(0);

  const getData = async name => {
    try {
      const data = await controlSearchResults(name);
      if (data) {
        setSearchResult(gotPage(data.page));
        setCurrentPage(data.page);
        setMaxPages(data.maxPages);
        setShow(true);
      } else {
        setShow(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setShow(false);
    }
  };

  const nextButtonHandler = () => {
    if (currentPage < maxPages) {
      setCurrentPage(value => value + 1);
      setSearchResult(gotPage(currentPage));
    }
  };

  const prevButtonHandler = () => {
    if (currentPage > 1) {
      setCurrentPage(value => value - 1);
      setSearchResult(gotPage(currentPage));
    }
  };

  const searchHandler = () => {
    if (search.trim() !== '') {
      setSearchMsg(search);
      getData(search, 1);
      setSearch('');
    }
  };

  useEffect(() => {
    console.log('Updated searchResult');
  }, [searchResult]);

  if (!searchResult) {
    return (
      <View style={styles.container}>
        <Text> Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.dashboard}>
      <View style={styles.searchBar}>
        <IconButton
          name="left"
          handler={() => navigation.goBack()}
          style={{btn: styles.recipeBtn, title: styles.customIcon}}
        />
        <TextInput
          placeholder="Search New Recipe"
          style={styles.searchInput}
          onChangeText={text => setSearch(text)}
          value={search}
        />
        <View style={styles.searchBtnView}>
          <IconButton
            name="search1"
            handler={searchHandler}
            style={{btn: styles.recipeBtn, title: styles.customIcon}}
          />
        </View>
      </View>

      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.searchResultView}>
        {show && searchResult && (
          <>
            <Text style={styles.searchText}>
              Showing Search Results for {searchMsg}
            </Text>
            <ResultList data={searchResult} navigation={navigation} />
            <View style={styles.searchPagination}>
              {currentPage > 1 && (
                <PrevButton
                  page={currentPage - 1}
                  prevButtonHandler={prevButtonHandler}
                />
              )}
              {currentPage < maxPages && (
                <NextButton
                  page={currentPage + 1}
                  nextButtonHandler={nextButtonHandler}
                />
              )}
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default Search;
