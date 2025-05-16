"use strict";

async function getPhoto(placeName) {
    console.log(placeName);

    const { Place } = await google.maps.importLibrary("places");

    const request = {
        textQuery: placeName,
        fields: ['displayName', 'location', 'photos', 'types']
    };

    const { places } = await Place.searchByText(request);

    const allowedTypes = ['locality', 'country', 'administrative_area_level_1'];
    const filteredResults = places.filter(place =>
        place.types.some(type => allowedTypes.includes(type))
    );
    console.log(filteredResults[0].displayName);

    if (filteredResults.length && filteredResults[0].photos && filteredResults[0].photos.length) {
        return filteredResults[0].photos[0].getURI({maxWidth: 200});
    }
    else return "";
}