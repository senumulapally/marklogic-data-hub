(:
  Copyright (c) 2021 MarkLogic Corporation

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
:)
xquery version "1.0-ml";

module namespace ext = "http://marklogic.com/data-hub/extensions/entity";

declare function build-entity-query($entity-type-names as xs:string*) as cts:query
{
  (: Adds "entity-" as a prefix, which is the convention for collections in this example project :)
  cts:collection-query(
    for $name in $entity-type-names
    return "entity-" || $name
  )
};

