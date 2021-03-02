import React, { useState, useEffect, useRef } from 'react';

import './GeoTargeting.scss';

import { PlusCircle, ChevronDown, X } from 'react-feather';

let targetItems = {
	'Россия' : [
		'Амурская обл.',
		'Архангельская обл.',
		'Астраханская обл.',
		'Белгородская обл.',
		'Московская обл.',
		'Москва',
		'Санкт-Петербург'
	],
	'Украина': [
		'Донецк',
		'Киев',
		'Запорожье'
	],
	'Казахстан': ''
}

const GeoTargeting = () => {

	const [targets, setTargets] = useState('');
	const [targetsFiltered, setTargetsFiltered] = useState('');
	const [dropdown, setDropdown] = useState(false);
	const [dropdownRegions, setDropdownRegions] = useState([]);

	const [addedTargets, setAddedTargets] = useState([]);

	const [searchQuery, setSearchQuery] = useState('');

	const ref = useRef(null);
	const plusIconSpan = useRef(null);

	useEffect(()=>{
		setTargets(targetItems);
	}, []);

	useEffect(()=>{
		setTargetsFiltered({...targets});
	}, [targets]);

	useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
			document.removeEventListener('click', handleClickOutside, true);
    };
  });

  const searchFilterInit = (searchSome = '') =>{
  	let newFilteredCountries = {},
  			prevFilteredCountries = {...targets};

  	for(let item in prevFilteredCountries){
  		addedTargets.forEach(addedTarget => {
  			if(typeof addedTarget === 'object'){
  				let addedTKey = Object.keys(addedTarget)[0];
  				delete prevFilteredCountries[addedTKey];
  			} else if(prevFilteredCountries[item] && prevFilteredCountries[item].includes(addedTarget)){
					let newArr = prevFilteredCountries[item].filter(sameTag => sameTag !== addedTarget);
					prevFilteredCountries[item] = newArr;
  			}
  		})
  	}

  	if(searchSome.length > 0){
  		for(let country in prevFilteredCountries){
	  		if(prevFilteredCountries[country]){
	  			let filterMatches = prevFilteredCountries[country].filter(regions => regions.toLowerCase().includes(searchSome.toLowerCase()));
	  			if(filterMatches.length){
						newFilteredCountries[country] = filterMatches;
	  			}
	  		}
	  	}
	  	setTargetsFiltered(newFilteredCountries);
  	} else {
  		setTargetsFiltered(prevFilteredCountries);
  	}
  }

  let handleClickOutside = event => {
  	if (ref.current && !ref.current.contains(event.target)) {
			setDropdown(false);
		}
  }

	// show COUNTRIES
  let showTargets = () => {
  	let countries = [];
  	for(let item in targetsFiltered){
  		let countryName = [item][0],
  				countryHasRegions = false;

			if(targetsFiltered[countryName]){
				countryHasRegions = true
			}			
			countries.push({name: countryName, regions: countryHasRegions});	
  	}

  	// show REGIONS in countries
  	let checkRegions = (country, regions) => {
  		if(regions && dropdownRegions.includes(country)){
				return targetsFiltered[country].map((region, index) => {
					return (
						<div className="geo-targeting__dropdown-subitem" key={index}>
							{region} <PlusCircle size="16" color="#1094b5" style={{cursor: 'pointer'}} onClick={() => handleChooseRegion(country, region)}/>
						</div>
					)
				})
  		} 
  	}

  	let handleChooseCountry = country => {
  		for(let countryObj in targetsFiltered){
  			if(countryObj === country){
  				let addedCountry = {
  					[country]: targetsFiltered[countryObj]
  				};
  				
  				let newObj = [
  					...addedTargets,
  					addedCountry
  				];

  				let newFilteredArr = {};
  				for(let targetCountry in targetsFiltered){
  					if(targetCountry !== countryObj){
  						newFilteredArr[targetCountry] = targetsFiltered[targetCountry]
  					}
  				}
  				setTargetsFiltered(newFilteredArr);
 					setAddedTargets(newObj);
  			}
  		}
  	}

  	let handleChooseRegion = (country, region) => {
			let addedTargetsArray = [
  			...addedTargets,
  			region
  		];

  		let newFilteredArr = targetsFiltered[country].filter(item => item !== region);

  		let newTargetsFilteredArray = targetsFiltered;

  		for(let item in targetsFiltered){
  			if(item === country){
  				newTargetsFilteredArray[item] = newFilteredArr
  			}
  		}
  		setTargetsFiltered(newTargetsFilteredArray);
  		setAddedTargets(addedTargetsArray);
  	}

  	let showCurrentCountryRegion = country => {
  		if(dropdownRegions.includes(country)){
  			setDropdownRegions(dropdownRegions.filter(item => item !== country));
  		} else {
  			setDropdownRegions(prev => [...prev, country]);
  		}
  	}

  	let showCountryPlusIcon = country =>{
  		if(addedTargets.length > 0 && country.regions){

  			for(let target in targets){
  				if(target === country.name){
  					if(targets[target].some(item => addedTargets.includes(item))){
  						return false
  					} else {
  						return true
  					}
  				}
  			}
  			return true
  		} else {
  			return true;
  		}
  	}

  	return (
  		countries.map((country, index) => {
  			return (
  				<div key={index} className="geo-targeting__dropdown-item">

  					<span onClick={() => showCurrentCountryRegion(country.name)}>
  						{ country.name }
  						{ country.regions ? <ChevronDown size="14" color="#333" /> : '' }
  					</span>

  					{ 
  						showCountryPlusIcon(country) 
	  						? <PlusCircle size="16" color="#1094b5" style={{marginLeft: 5}} onClick={() => handleChooseCountry(country.name)}/>
	  						: ''
  					}

  					{ checkRegions(country.name, country.regions) }
  				</div>
  			)
  		})
  	)
  }

  let showAddedTargets = () => {
  	return addedTargets.map((item, index) => {
  		if(typeof item === 'object'){
  			return <span className="geo-targeting__added-item btn bg-info-lt" onClick={()=>removeAddedTarget(item, index)} key={index}>{Object.keys(item)[0]} <X size={14}/></span>
  		} else {
  			return <span className="geo-targeting__added-item btn bg-info-lt" onClick={()=>removeAddedTarget(item, index)} key={index}>{item} <X size={14}/></span>
  		}
  	});
  }

  let removeAddedTarget = (item, index) => {
  	let newArr = addedTargets;
  	newArr.splice(index, 1);
  	
  	setAddedTargets(newArr);
  	searchFilterInit(searchQuery);
  }

  let handleInput = searchText => {
  	setSearchQuery(searchText);
  	searchFilterInit(searchText);
  }

	return (
		<div className="geo-targeting">
			<div className="geo-targeting__input" onClick={ () => setDropdown(prev => !prev) }>
				{
					showAddedTargets()
				}
				<input type="text" value={searchQuery} onChange={ event => handleInput(event.target.value)}  placeholder="Поиск..."/>
				
			</div>
			{
				dropdown ? (
					<div ref={ref} className="geo-targeting__dropdown">
						{ Object.keys(targetsFiltered).length ? showTargets() : 'Нет совпадений' }
					</div>
				) : ''
			}
			
		</div>
	)
}

export default GeoTargeting